import React, {useState, useEffect} from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { cookieParser } from "../../utils/cookie-util";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { deleteCookie } from "../../utils/cookie-util";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Header(): JSX.Element {
    const cookieObject = cookieParser();
    let location = window.location;
    let queryParams = new URL(document.location.toString()).searchParams;

    const [loggedIn, setLoggedIn] = useState<boolean>(cookieObject.loggedIn === "true");

    // Temporarily putting this here just to get code to compile
    let userName = "";

    useEffect(() => {
        let ignore = false;
        if (loggedIn && !ignore) {
            verifyUserLogin();
        }
        return () => { ignore = true };
    }, []);

    function redirectSignUp(): void {
        // redirect to sign up route
        queryParams.set("isBusy", "true");
        location.replace(location.origin + "/sign-up?" + queryParams.toString());
        window.history.pushState({}, "", location.origin + "/sign-up?" + queryParams.toString());
    };

    function redirectLogin(): void {
        // redirect to login page
        queryParams.set("isBusy", "true");
        window.history.pushState({}, "", location.origin + "/login?" + queryParams.toString());
        location.replace(location.origin + "/login?" + queryParams.toString());
    };

    async function verifyUserLogin() {
        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/login/verify`, "POST", {
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

    async function handleLogout() {
        setLoggedIn(false);
        deleteCookie("loggedIn");
        deleteCookie("userId");
        await fetchWrapper(REACT_APP_SERVER_URI + `/users/logout`, "POST");
        redirectLogin();
    };
    
    if (loggedIn) {
        return (
            <div data-testid='logged-in-header'>
                <a href={location.origin} target="_self">
                    <img src="" alt="" />
                </a>
                <div>Hi, {userName}!</div>
                <div onClick={handleLogout}>Logout</div>
            </div>
        );
    };

    return (
        <header data-testid='logged-out-header'>
            <a href={location.origin} target="_self">
                <img src="" alt="" />
            </a>
            <SearchBar />
            <button onClick={redirectSignUp}>Sign Up</button>
            <button onClick={redirectLogin}>Login</button>
        </header>
    );
};

export {Header}