import React, { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser, deleteCookie } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { Button, Menu, MenuItem, SxProps, Grid } from "@mui/material";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";
import svg from '../../static/5_SVG-cropped.svg';
import { useMobile } from "../../hooks/useMobile";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Header(): JSX.Element {
    const cookieObject = cookieParser();
    const location = window.location;
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const isMobile: boolean = useMobile();
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

    const dropdownButtonSx: SxProps = {
        margin: '7px',
        bgcolor: '#3B4B59',
        color: '#F2E5D1',
        width: 'fit-content',
        height: 'fit-content',
        textTransform: 'none',
    };

    const signupButtonSx: SxProps = {
        color: 'secondary.main',
        background: '#3B4B59',
        marginRight: "4px",
        width: '100px',
    };

    const loginButtonSx: SxProps = {
        color: 'secondary.main',
        borderColor: 'secondary.main',
        marginLeft: "4px",
        marginRight: "20px",
        width: 'fit-content',
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
            <Grid container>
                <Grid item xs={5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'baseline', marginLeft: isMobile ? '0rem' : '2rem'}}>
                    <a href={location.origin} target="_self">
                        <img src={svg} alt="Handl Logo" width={"200px"} height={"75px"} style={{padding: '10px'}}/>
                    </a>
                </Grid>
                {loggedIn && 
                    <Grid item xs={6} ml={isMobile ? '1rem' : '2.75rem'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                        <Button
                            variant="contained"
                            onClick={handleDropdownClick}
                            endIcon={<KeyboardArrowDown />}
                            sx={dropdownButtonSx}
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
                    </Grid>
                }
                <Grid item xs={6} ml={isMobile ? '2rem' : '3rem'} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                    {!isLoginOrSignUpPage && !loggedIn && <Button variant="contained" sx={signupButtonSx} onClick={redirectSignUp}>Sign Up</Button>}
                    {!isLoginOrSignUpPage && !loggedIn && <Button variant="outlined" sx={loginButtonSx} onClick={redirectLogin}>Login</Button>}
                </Grid>
            </Grid>
            {isLandingPage && 
                <Grid item xs={12}>
                    <SearchBar isLandingPage={isLandingPage}/>
                </Grid>
            }
        </header>
    );
};

export {Header}