import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { deleteCookie } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Header(): JSX.Element {
    let location = window.location;
    let isLandingPage: boolean = location.pathname === "/";
    let isLoginOrSignUpPage: boolean = location.pathname === "/login" || location.pathname === "/sign-up";
    let loggedIn = useLoginStatus();
    
    // TODO: (MEDIUM) have logged in return user's first name upon successful login
    let userName = "";

    function redirectSignUp(): void {
        // redirect to sign up route
        window.history.pushState({}, "", location.origin + "/sign-up?");
        location.replace(location.origin + "/sign-up?");
    };

    function redirectLogin(): void {
        // redirect to login page
        window.history.pushState({}, "", location.origin + "/login?");
        location.replace(location.origin + "/login?");
    };

    async function handleLogout() {
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
                {isLandingPage && <SearchBar />}
            </div>
        );
    };

    return (
        <header data-testid='logged-out-header'>
            <a href={location.origin} target="_self">
                <img src="" alt="" />
            </a>
            {isLandingPage && <SearchBar />}
            {!isLoginOrSignUpPage && <button onClick={redirectSignUp}>Sign Up</button>}
            {!isLoginOrSignUpPage && <button onClick={redirectLogin}>Login</button>}
        </header>
    );
};

export {Header}