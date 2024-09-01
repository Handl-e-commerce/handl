import React, { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser, deleteCookie } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";
import svg from '../../static/5_SVG-cropped.svg';

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
        <header data-testid='header' style={{
            position: 'relative',
            top: 0,
            width: '100%',
            background: "#242425",
            color: '#F2E5D1',
            marginBottom: '14px'
        }}>
            <a href={location.origin} target="_self">
                <img src={svg} alt="Handl Logo" width={"200px"} height={"75px"} style={{padding: '10px'}}/>
            </a>
            {loggedIn && 
                <Box>
                    <Button
                        variant="contained"
                        onClick={handleDropdownClick}
                        endIcon={<KeyboardArrowDown />}
                        sx={{
                            bgcolor: '#3B4B59',
                            color: '#F2E5D1'
                        }}
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
            {!isLoginOrSignUpPage && !loggedIn && <Button variant="contained" sx={{color: 'secondary.main', background: '#3B4B59', marginRight: "4px"}} onClick={redirectSignUp}>Sign Up</Button>}
            {!isLoginOrSignUpPage && !loggedIn && <Button variant="outlined" sx={{color: 'secondary.main', borderColor: 'secondary.main', marginLeft: "4px", marginRight: "20px"}} onClick={redirectLogin}>Login</Button>}
            {isLandingPage && <SearchBar />}
        </header>
    );
};

export {Header}