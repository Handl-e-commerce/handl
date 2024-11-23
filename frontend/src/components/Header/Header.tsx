import React from "react";
import { SxProps, Grid, Box, Link } from "@mui/material";
import svg from '../../static/5_SVG-cropped.svg';
import { useMobile } from "../../hooks/useMobile";
import { CategoriesMenu } from "../CategoriesMenu/CategoriesMenu";
import { UserHeaderMenu } from "../UserHeaderMenu/UserHeaderMenu";

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

function Header(): JSX.Element {
    const location = window.location;
    const isMobile: boolean = useMobile();

    function gridLayout(): JSX.Element {
        if (isMobile) {
            return (
                <>
                    <Grid container pt={1} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Grid xs={6} item sx={{display: 'flex', alignItems: 'center', justifyContent: 'baseline', marginLeft: isMobile ? '0rem' : '2rem'}}>
                            <a href={location.origin} target="_self">
                                <img src={svg} alt="Handl Logo" width={"140px"} height={"75px"} style={{padding: '10px'}}/>
                            </a>
                        </Grid>
                        <UserHeaderMenu sx={dropdownButtonSx} />
                        <CategoriesMenu sx={dropdownButtonSx} />
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
                    <CategoriesMenu sx={dropdownButtonSx} />
                    <Link href={location.origin + "/about-us"} target="_self" underline="none" color='#F2E5D1' sx={{ fontSize: '16px', fontWeight: 600 }}>About</Link>
                </Box>
                <UserHeaderMenu sx={dropdownButtonSx} />
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