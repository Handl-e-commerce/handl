import { useState, useEffect } from "react";
import { cookieParser, deleteCookie } from "../utils/cookie-util";
import { fetchWrapper } from "../utils/fetch-wrapper";

const cookieObject = cookieParser();

function useLoginStatus(): boolean {
    const [loggedIn, setLoggedIn] = useState<boolean>(cookieObject.loggedIn === "true")
    
    useEffect(() => {
        let ignore = false;
        if (loggedIn && !ignore) {
            verifyUserLogin();
        }
        return () => { ignore = true };
    }, []);
    
    async function verifyUserLogin() {
        const response: Response = await fetchWrapper(`/users/login/verify`, "POST", {
            userId: cookieObject.userId
        });
        if (response.status === 201) {
            setLoggedIn(true);
        }
        else {
            console.log("Failed verification, logging user out.");
            setLoggedIn(false);
            deleteCookie("loggedIn");
            deleteCookie("userId");
        }
    };

    return loggedIn;
};



export { useLoginStatus };