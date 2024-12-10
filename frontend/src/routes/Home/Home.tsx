import React, { useEffect, useState } from "react";
import fba from '../../static/FBA.jpg';
import clothing from '../../static/Clothing.jpg';
import health from '../../static/Health & Beauty.jpg';
import electronics from '../../static/Electronics.jpg';
import { Box, Container, Grid, Link, List, Typography, TypographyOwnProps } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import { Banner } from "../../components/Banner/Banner";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { iconMapper } from "../../utils/icon-mapper";

function Home(): JSX.Element {
    const [categories, setCategories] = useState<JSX.Element[][]>();
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

    async function getCategories(): Promise<void> {
        const response = await fetchWrapper('/vendors/categories', 'GET');
        const data: { category: string }[] = (await response.json()).result;
        let breakpoint = 15;
        let numTranches = Math.ceil(data.length / breakpoint);
        let column: JSX.Element[] = [];
        let matrix: JSX.Element[][] = [];
        let passes = 0;
        data.forEach((val, i) => {
            if (i % breakpoint === 0 && i > 0 && !isMobile) {
                matrix.push(column);
                column = [];
                passes++;
            };
            let queryRoute = new URLSearchParams({ 'category': val.category });
            column.push(
                <List key={val.category} sx={{ display: 'flex', alignItems: 'center' }}>
                    {iconMapper[val.category]}
                    <Link
                        href={`${location.origin}/results?${queryRoute.toString()}`} 
                        target="_self"
                        underline="none"
                        color='primary.main'
                        sx={{ 
                            fontSize: '16px',
                            fontWeight: 600,
                            marginLeft: '1rem'
                        }}
                    >
                        {val.category}
                    </Link>
                </List>
            );
            if (i === data.length - 1 && passes !== numTranches && !isMobile) {
                matrix.push(column);
            };
        });
        if (isMobile) {
            matrix.push(column);
        };
        setCategories(matrix);
    };

    function createCategoriesList(): JSX.Element {
        return (
            <Grid container spacing={'5px'} sx={styles.gridContainer}>
                <Grid item xs={12}>
                    <Typography 
                    variant={styles.font.heading.variant}
                    component={styles.font.heading.component}
                    fontSize={styles.font.heading.fontSize}
                    fontWeight={styles.font.heading.fontWeight}
                >
                    All Categories
                </Typography>
                </Grid>
                {categories && categories.map((column, i) => (
                    <Grid key={i} item xs={styles.grid.xs} sx={{ marginRight: '0rem'}}>
                        {column}
                    </Grid>
                ))}
            </Grid>
        );
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
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Amazon FBA</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                            <img src={health} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Health & Beauty</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                            <img src={clothing} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Clothing</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cameras+%2F+Tablets+%2F+Drones+%2F+MP3+Players+%2F+Home+%2F+Entertainment+Audio+etc.%2CCell+Phone+Accessories+%2F+Wearables+%2F+Headphones+%2F+Speakers'} target="_self">
                            <img src={electronics} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Electronics</Typography>
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
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Amazon FBA</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                            <img src={health} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Health & Beauty</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                            <img src={clothing} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Clothing</Typography>
                    </Grid>
                    <Grid item xs={styles.grid.xs}>
                        <a href={location.origin + '/results?categories=Cameras+%2F+Tablets+%2F+Drones+%2F+MP3+Players+%2F+Home+%2F+Entertainment+Audio+etc.%2CCell+Phone+Accessories+%2F+Wearables+%2F+Headphones+%2F+Speakers'} target="_self">
                            <img src={electronics} alt="" style={styles.image} />
                        </a>
                        <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Electronics</Typography>
                    </Grid>
                </Grid>
                {createCategoriesList()}
            </Container>
        </Box>
    )
};

export {Home};