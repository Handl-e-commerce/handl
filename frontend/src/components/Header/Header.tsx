import React, { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser, deleteCookie } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { Button, Menu, MenuItem, SxProps, Grid, Box } from "@mui/material";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";
import svg from '../../static/5_SVG-cropped.svg';
import { useMobile } from "../../hooks/useMobile";

const headerStyles: React.CSSProperties = {
    position: 'relative',
    top: 0,
    height: 'fit-content',
    width: '100%',
    background: "#242425",
    color: '#F2E5D1',
    borderBottom: 'solid 1px primary.main',
    paddingBottom: '.625rem',
};

const dropdownButtonSx: SxProps = {
    marginRight: '.75rem',
    fontWeight: 'bold',
    background: '#3B4B59',
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
        deleteCookie("firstName");
        await fetchWrapper(`/users/logout`, "POST");
        redirectLogin();
    };

    function handleDropdownClick(event: React.MouseEvent<HTMLElement>): void {
        setMenuAnchor(event.currentTarget);
    };

    function handleDropdownClose(): void {
        setMenuAnchor(null);
    };

    function headerMenu(): JSX.Element | undefined {
        const menuSx: SxProps = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            // marginLeft: isMobile ? 0 : loggedIn ? '2.5rem' : '3rem',
        };
        let xs = isMobile ? 6 : undefined; 
        
        if (loggedIn) {
            return (
                <Grid item xs={xs} sx={menuSx}>
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
            )
        }
        else if (!isLoginOrSignUpPage) {
            return (
                <Grid item xs={xs} sx={menuSx}>
                    <Button variant="contained" sx={signupButtonSx} onClick={redirectSignUp}>Sign Up</Button>
                    <Button variant="outlined" sx={loginButtonSx} onClick={redirectLogin}>Login</Button>
                </Grid>
            );
        };
        return;
    };

    function gridLayout(): JSX.Element {
        if (isMobile) {
            return (
                <>
                    <Grid container pt={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid xs={6} item sx={{display: 'flex', alignItems: 'center', justifyContent: 'baseline', marginLeft: isMobile ? '0rem' : '2rem'}}>
                            <a href={location.origin} target="_self">
                                <img src={svg} alt="Handl Logo" width={"200px"} height={"75px"} style={{padding: '10px'}}/>
                            </a>
                        </Grid>
                        {headerMenu()}
                    </Grid>
                    {!isLoginOrSignUpPage && <SearchBar />}
                </>
            );
        }
        return (
            <Grid container pt={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'baseline', marginLeft: isMobile ? '0rem' : '2rem'}}>
                    <a href={location.origin} target="_self">
                        <img src={svg} alt="Handl Logo" width={"200px"} height={"75px"} style={{padding: '10px'}}/>
                    </a>
                </Grid>
                <Grid item xs={9}>
                    {!isLoginOrSignUpPage && <SearchBar />}
                </Grid>
                {headerMenu()}
            </Grid>
        );
    }

    return (
        <header data-testid='header' style={headerStyles}>
            <Box>
                {gridLayout()}
            </Box>
        </header>
    );
};

export {Header}