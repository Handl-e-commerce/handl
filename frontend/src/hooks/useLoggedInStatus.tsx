import { useState, useEffect } from "react";
import { cookieParser } from "../utils/cookie-util";

const cookieObject = cookieParser();

function useLoginStatus(): boolean {
    const [loggedIn, setLoggedIn] = useState<boolean>(cookieObject.loggedIn === "true")
    console.log(loggedIn)
    useEffect(() => {
        setLoggedIn(cookieObject.loggedIn === "true");
    }, [loggedIn]);
    
    return loggedIn;
};



export { useLoginStatus };