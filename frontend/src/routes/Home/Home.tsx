import React, { useState, useEffect } from "react";
import fba from '../../static/FBA.jpg';
import clothing from '../../static/Clothing.jpg';
import health from '../../static/Health & Beauty.jpg';
import electronics from '../../static/Electronics.jpg';
import { Container, Grid, Typography, TypographyOwnProps } from "@mui/material";


function Home(): JSX.Element {
    let location = window.location;
    const [width, setWidth] = useState<number>(window.innerWidth);
    const isMobile: boolean = width <= 393;

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    function handleWindowSizeChange(): void {
        setWidth(window.innerWidth);
    };

    const styles = {
        grid: {
            xs: isMobile ? 6 : 3
        },
        image: {
            dimension: isMobile ? 180 : 275
        },
        font: {
            heading: {
                fontSize: isMobile ? '30px' : '36px',
                fontWeight: 600,
                variant: 'h4' as TypographyOwnProps['variant'],
                component: 'h4' as React.ElementType<any, keyof React.JSX.IntrinsicElements>
            },
        }
    };

    return (
        <Container sx={{minHeight: '60rem', textAlign: isMobile ? 'center' : 'left'}}>
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
                    <a href={location.origin + '/results?categories=amazon-fba'} target="_self">
                        <img src={fba} alt="" width={styles.image.dimension} height={styles.image.dimension} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Amazon FBA</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                        <img src={health} alt="" width={styles.image.dimension} height={styles.image.dimension} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Health & Beauty</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                        <img src={clothing} alt="" width={styles.image.dimension} height={styles.image.dimension} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Clothing</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + '/results?categories=electronics'} target="_self">
                        <img src={electronics} alt="" width={styles.image.dimension} height={styles.image.dimension} />
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
                    <a href={location.origin + '/results?categories=amazon-fba'} target="_self">
                        <img src={fba} alt="" width={styles.image.dimension} height={styles.image.dimension} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Amazon FBA</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                        <img src={health} alt="" width={styles.image.dimension} height={styles.image.dimension} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Health & Beauty</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                        <img src={clothing} alt="" width={styles.image.dimension} height={styles.image.dimension} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Clothing</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + '/results?categories=electronics'} target="_self">
                        <img src={electronics} alt="" width={styles.image.dimension} height={styles.image.dimension} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'}>Electronics</Typography>
                </Grid>
            </Grid>
        </Container>
    )
};

export {Home};