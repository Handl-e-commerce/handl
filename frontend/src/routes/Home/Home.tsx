import React from "react";
import fba from '../../static/FBA.jpg';
import clothing from '../../static/Clothing.jpg';
import health from '../../static/Health & Beauty.jpg';
import electronics from '../../static/Electronics.jpg';
import { Box, Container, Grid, SxProps, Typography, TypographyOwnProps } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import { Banner } from "../../components/Banner/Banner";

function Home(): JSX.Element {
    let location = window.location;
    let isMobile: boolean = useMobile();

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
        gridContainer: { 
            borderTop: '1.5px solid #E5E5EA',
            marginTop: '10px'
        },
    };

    return (
        <Box sx={{minHeight: '60rem', textAlign: isMobile ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Banner />
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={"5px"} mb={'24px'} data-testid="most-viewed-categories-container" sx={styles.gridContainer}>
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
                <Grid container spacing={'5px'} mb={'24px'} data-testid="featured-categories-container" sx={styles.gridContainer}>
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