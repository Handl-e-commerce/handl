import React, { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser, deleteCookie } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";
import svg from '../../static/5_SVG.svg';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Header(): JSX.Element {
    const cookieObject = cookieParser();
    const location = window.location;
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    let isLandingPage: boolean = location.pathname === "/";
    let isLoginOrSignUpPage: boolean = location.pathname === "/login" || location.pathname === "/sign-up";
    let loggedIn = useLoginStatus();

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

    function handleDropdownClick(event: React.MouseEvent<HTMLElement>): void {
        setMenuAnchor(event.currentTarget);
    };

    function handleDropdownClose(): void {
        setMenuAnchor(null);
    };

    return (
        <header data-testid='header'>
            <a href={location.origin} target="_self">
                <img src={svg} alt="Handl Logo" width={"250px"} height={"250px"}/>
            </a>
            {isLandingPage && <SearchBar />}
            {loggedIn && 
                <Box>
                    <Button
                        variant="contained"
                        onClick={handleDropdownClick}
                        endIcon={<KeyboardArrowDown />}
                    >
                        Hi, {cookieObject?.firstName}!
                    </Button>
                    <Menu
                        anchorEl={menuAnchor}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={Boolean(menuAnchor)}
                        onClose={handleDropdownClose}
                    >
                        <MenuItem onClick={handleLogout}>
                            Logout
                            <Logout/>
                        </MenuItem>
                    </Menu>
                </Box>
            }
            {!isLoginOrSignUpPage && !loggedIn && <Button variant="contained" onClick={redirectSignUp}>Sign Up</Button>}
            {!isLoginOrSignUpPage && !loggedIn && <Button variant="outlined" onClick={redirectLogin}>Login</Button>}
        </header>
    );
};

export {Header}