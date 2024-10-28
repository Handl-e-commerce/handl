import React from "react";
import './Home.css';
import fba from '../../static/FBA.jpg';
import clothing from '../../static/Clothing.jpg';
import health from '../../static/Health & Beauty.jpg';
import electronics from '../../static/Electronics.jpg';
import { Box, Button, Container, Grid, SxProps, Typography, TypographyOwnProps } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import zIndex from "@mui/material/styles/zIndex";

function Home(): JSX.Element {
    let location = window.location;
    let isMobile: boolean = useMobile();

    function redirectResults(): void {
        // redirect to results page
        window.history.pushState({}, "", location.origin + "/results?");
        location.replace(location.origin + "/results?");
    };

    const styles = {
        grid: {
            xs: isMobile ? 6 : 3
        },
        image: {
            width: isMobile ? 174 : 275,
            height: isMobile ? 174 : 275,
            borderRadius: '4px'
        },
        font: {
            heading: {
                fontSize: isMobile ? '30px' : '36px',
                fontWeight: 600,
                variant: 'h4' as TypographyOwnProps['variant'],
                component: 'h4' as React.ElementType<any, keyof React.JSX.IntrinsicElements>
            },
        },
        banner: {
            color: '#F2E5D1',
            background: '#242425',
            padding: isMobile ? 1.25 : 2,
            position: 'relative',
            zIndex: 0,
            height: '30rem',
            width: '100%',
        },
        bannerInfo: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            padding: 5,
            background: '#242425',
            height: '27rem',
        },
        aboutUs: { 
            padding: 7,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#F2E5D1',
            background: '#3B4B59',
            // background: '#4C9E80',
            // background: '#12715B',
            height: '30rem',
            width: '100%',
            marginBottom: '1rem',
        }
    };

    const buttonSx: SxProps = {
        width: '80%',
        background: '#E5E5EA',
        marginBottom: '14px',
        borderRadius: '5px',
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: '1rem'
    };

    return (
        <Box sx={{minHeight: '60rem', textAlign: isMobile ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={styles.banner} aria-roledescription="Home Screen Banner">
                <Container className={'gradient-border'} sx={{ padding: '1px !important'}}>
                    <Box sx={styles.bannerInfo} aria-roledescription="Home Screen Banner Content">
                        <Typography variant={ isMobile ? "h5" : "h3"}>
                            Handl is the world's #1 place to find and connect with ecommerce wholesale, retail, and distribution buyers and sellers.
                        </Typography>
                        <Typography variant={ isMobile ? "subtitle2" : "h6" }>
                            Search below to find hundreds of buyers and sellers!
                        </Typography>
                        <SearchBar isLandingPage={true} sx={{ width: '70%', marginTop: 3 }}/>
                    </Box>
                </Container>
            </Box>
            <Box sx={styles.aboutUs} aria-roledescription="Home Screen Brief About Us">
                <Container>
                    <Typography variant={ isMobile ? "h6" : "h4"} m={1}>
                        Handl is the world's fastest growing B2B directory for ecommerce wholesalers, distributors, and retailers.
                    </Typography>
                    <Typography variant={ isMobile ? "body2" : "h5"} m={1}>
                        Click below to view our entire directory!
                    </Typography>
                    <Button sx={buttonSx} onClick={redirectResults}>View our entire directory of wholesalers and distributors</Button>
                </Container>
            </Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={"5px"} mb={'24px'} data-testid="most-viewed-categories-container">
                    <Grid item xs={12}>
                        <Typography 
                            variant={styles.font.heading.variant}
                            component={styles.font.heading.component}
                            fontSize={styles.font.heading.fontSize}
                            fontWeight={styles.font.heading.fontWeight}
                        >
                            Most Viewed Categories
                        </Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?search-params=fba'} target="_self">
                            <img src={fba} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Amazon FBA</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                            <img src={health} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Health & Beauty</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                            <img src={clothing} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Clothing</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cameras+%2F+Tablets+%2F+Drones+%2F+MP3+Players+%2F+Home+%2F+Entertainment+Audio+etc.%2CCell+Phone+Accessories+%2F+Wearables+%2F+Headphones+%2F+Speakers'} target="_self">
                            <img src={electronics} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Electronics</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={'5px'} mb={'24px'} data-testid="featured-categories-container">
                    <Grid item xs={12}>
                    <Typography 
                            variant={styles.font.heading.variant}
                            component={styles.font.heading.component}
                            fontSize={styles.font.heading.fontSize}
                            fontWeight={styles.font.heading.fontWeight}
                        >
                            Featured Categories
                        </Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?search-params=fba'} target="_self">
                            <img src={fba} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Amazon FBA</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                            <img src={health} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Health & Beauty</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                            <img src={clothing} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Clothing</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cameras+%2F+Tablets+%2F+Drones+%2F+MP3+Players+%2F+Home+%2F+Entertainment+Audio+etc.%2CCell+Phone+Accessories+%2F+Wearables+%2F+Headphones+%2F+Speakers'} target="_self">
                            <img src={electronics} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Electronics</Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
};

export {Home};