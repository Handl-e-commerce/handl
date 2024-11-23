import React, { useEffect, useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser, deleteCookie } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { Button, Menu, MenuItem, SxProps, Grid, Box, Link } from "@mui/material";
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
    borderBottom: '.5px solid #F2E5D1',
    paddingBottom: '.625rem',
};

const dropdownButtonSx: SxProps = {
    marginRight: '.75rem',
    fontWeight: 600,
    fontSize: '16px',
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
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const [categoriesMenuAnchor, setCategoriesMenuAnchor] = useState<null | HTMLElement>(null);
    const [categories, setCategories] = useState<string[]>();
    
    const isMobile: boolean = useMobile();

    let isLoginOrSignUpPage: boolean = location.pathname === "/login" || location.pathname === "/sign-up";
    let loggedIn = useLoginStatus();
    let queryParams = new URL(document.location.toString()).searchParams;

    async function getCategories(): Promise<void> {
        const response = await fetchWrapper('/vendors/categories', 'GET');
        const data: { subcategory: string }[] = (await response.json()).result;
        let categories: string[] = [];
        data.forEach((val, i) => {
            categories.push(val.subcategory);
        });
        setCategories(categories);
    };

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            if (!categories) {
                getCategories();
            };
        };
        return () => { ignore = true };
    }, []);

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

    function userHeaderMenu(): JSX.Element | undefined {
        const menuSx: SxProps = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            marginLeft: isMobile ? 0 : loggedIn ? '0' : '.5rem',
        };
        let xs = isMobile ? 6 : undefined; 
        
        if (loggedIn) {
            return (
                <Grid item xs={xs} sx={menuSx}>
                    <Button
                        variant="contained"
                        onClick={(e: React.MouseEvent<HTMLElement>) => setUserMenuAnchor(e.currentTarget)}
                        endIcon={<KeyboardArrowDown />}
                        sx={dropdownButtonSx}
                    >
                        Hi, {cookieObject?.firstName}!
                    </Button>
                    <Menu
                        anchorEl={userMenuAnchor}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={Boolean(userMenuAnchor)}
                        onClose={() => setUserMenuAnchor(null)}
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

    function categoriesMenu(): JSX.Element {
        const menuSx: SxProps = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
        };

        return (
            <Grid item sx={menuSx}>
                <Button
                    variant="contained"
                    onClick={(e: React.MouseEvent<HTMLElement>) => setCategoriesMenuAnchor(e.currentTarget)}
                    endIcon={<KeyboardArrowDown />}
                    sx={{...dropdownButtonSx, background: 'none', boxShadow: 'none'}}
                >
                    Categories
                </Button>
                <Menu
                    anchorEl={categoriesMenuAnchor}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={Boolean(categoriesMenuAnchor)}
                    onClose={() => setCategoriesMenuAnchor(null)}
                >
                    {categories && categories.map((category, i) => (
                        <MenuItem
                            key={category}
                            value={category}
                            sx={{ padding: '6px 6px'}}
                            onClick={(e) => {
                                queryParams.set("categories", (e.target as HTMLElement).innerText);
                                window.history.pushState({}, "", `${location.origin}/results?${queryParams.toString()}`);
                                location.replace(`${location.origin}/results?${queryParams.toString()}`);
                            }}
                        >
                            {category}
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>
        )
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
                        {userHeaderMenu()}
                    </Grid>
                </>
            );
        }
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
                    <a href={location.origin} target="_self">
                        <img src={svg} alt="Handl Logo" width={"200px"} height={"75px"} style={{padding: '10px'}}/>
                    </a>
                    {categoriesMenu()}
                    <Link href={location.origin + "/about-us"} target="_self" underline="none" color='#F2E5D1' sx={{ fontSize: '16px', fontWeight: 600 }}>About</Link>
                </Box>
                {userHeaderMenu()}
            </Box>
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