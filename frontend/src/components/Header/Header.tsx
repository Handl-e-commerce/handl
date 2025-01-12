import React from "react";
import { SxProps, Grid, Box, Link } from "@mui/material";
import goldLogoTransparent from '../../static/Gold_Logo_Transparent_Image.png';
import { useMobile } from "../../hooks/useMobile";
import { CategoriesMenu } from "../CategoriesMenu/CategoriesMenu";
import { UserHeaderMenu } from "../UserHeaderMenu/UserHeaderMenu";
import { MobileDrawer } from "../MobileDrawer/MobileDrawer";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";

const headerStyles: React.CSSProperties = {
    position: 'relative',
    top: 0,
    height: 'fit-content',
    width: '100%',
    background: "#242425",
    color: '#F2E5D1',
    paddingTop: '.625rem',
    paddingBottom: '.625rem',
};

const dropdownButtonSx: SxProps = {
    fontWeight: 600,
    fontSize: '16px !important',
    background: '#3B4B59',
    color: '#F2E5D1',
    width: 'fit-content',
    height: 'fit-content',
    textTransform: 'none',
};

function Header(): JSX.Element {
    const location = window.location;
    const isMobile: boolean = useMobile();
    const loggedIn: boolean = useLoginStatus();

    function gridLayout(): JSX.Element {
        if (isMobile) {
            return (
                <>
                    <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <MobileDrawer>
                            <CategoriesMenu sx={{...dropdownButtonSx, fontSize: '22px'}}/>
                            <Link
                                href={location.origin + "/about-us"}
                                target="_self"
                                underline="none"
                                color='#F2E5D1'
                                sx={{
                                    paddingBottom: '6px',
                                    paddingLeft: '1rem',
                                    fontSize: '22px',
                                    fontWeight: 600
                                }}
                            >
                                About
                            </Link>
                            <Link 
                                href={location.origin + "/blog"}
                                target="_self"
                                underline="none"
                                color='#F2E5D1'
                                sx={{
                                    paddingBottom: '6px',
                                    paddingLeft: '1rem',
                                    fontSize: '22px',
                                    fontWeight: 600
                                }}
                            >
                                Blog
                            </Link>
                            {loggedIn && <Link 
                                href={location.origin + "/me/saved-vendors"}
                                target="_self"
                                underline="none"
                                color='#F2E5D1'
                                sx={{
                                    paddingBottom: '6px', 
                                    paddingLeft: '1rem',
                                    fontSize: '22px',
                                    fontWeight: 600
                                }}
                            >
                                Saved Vendors
                            </Link>}
                        </MobileDrawer>
                        <Grid 
                            item 
                            sx={{
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'baseline',
                                marginLeft: loggedIn ? '-4rem' : '-1rem',
                            }}
                        >
                            <a href={location.origin} target="_self">
                                <img src={goldLogoTransparent} alt="Handl Logo" width={"140px"} height={"60px"} style={{padding: '10px'}}/>
                            </a>
                        </Grid>
                        <UserHeaderMenu sx={dropdownButtonSx} />
                    </Grid>
                </>
            );
        }
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem' }}>
                    <a href={location.origin} target="_self">
                        <img src={goldLogoTransparent} alt="Handl Logo" width={"120px"} height={"55px"} style={{padding: '10px'}}/>
                    </a>
                    <CategoriesMenu sx={dropdownButtonSx} />
                    <Link 
                        href={location.origin + "/about-us"}
                        target="_self"
                        underline="none"
                        color='#F2E5D1'
                        sx={{
                            marginRight: '16px',
                            fontSize: '16px',
                            fontWeight: 600
                        }}
                    >
                        About
                    </Link>
                    <Link 
                        href={location.origin + "/blog"}
                        target="_self"
                        underline="none"
                        color='#F2E5D1'
                        sx={{
                            marginRight: '16px',
                            fontSize: '16px',
                            fontWeight: 600
                        }}
                    >
                        Blog
                    </Link>
                    {loggedIn && <Link 
                        href={location.origin + "/me/saved-vendors"}
                        target="_self"
                        underline="none"
                        color='#F2E5D1'
                        sx={{
                            fontSize: '16px',
                            fontWeight: 600
                        }}
                    >
                        Saved Vendors
                    </Link>}
                </Box>
                <UserHeaderMenu sx={{ ...dropdownButtonSx, marginRight: '1.5rem'}} />
            </Box>
        );
    };

    return (
        <header data-testid='header' style={headerStyles}>
            <Box>
                {gridLayout()}
            </Box>
        </header>
    );
};

export {Header}