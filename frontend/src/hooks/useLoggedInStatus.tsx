import { useState, useEffect } from "react";
import { cookieParser } from "../utils/cookie-util";

const cookieObject = cookieParser();

function useLoginStatus(): boolean {
    const [loggedIn, setLoggedIn] = useState<boolean>(cookieObject.loggedIn === "true")
    
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            setLoggedIn(cookieObject.loggedIn === "true");
        }
        return () => { ignore = true };
    }, []);
    
    return loggedIn;
};



export { useLoginStatus };