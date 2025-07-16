import React, { useEffect, useState } from "react";
import fba from '../../static/FBA.jpg';
import clothing from '../../static/Clothing.jpg';
import health from '../../static/Health & Beauty.jpg';
import electronics from '../../static/Electronics.jpg';
import { Box, Button, Container, Grid, Link, List, Typography, TypographyOwnProps } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import { Banner } from "../../components/Banner/Banner";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { iconMapper } from "../../utils/icon-mapper";
import { SalesBanner } from "../../components/SalesBanner/SalesBanner";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { cookieParser } from "../../utils/cookie-util";

function Home(): JSX.Element {
    const [categories, setCategories] = useState<JSX.Element[][]>();
    let location = window.location;
    let isMobile: boolean = useMobile();
    const cookieObject = cookieParser();
    const isLoggedIn = useLoginStatus();

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
            // borderTop: '1.5px solid #E5E5EA',
            marginTop: '10px'
        },
        button: {
            marginTop: '2rem',
            marginBottom: isMobile ? '20px' : '0px',
            background: '#2D7FF9',
            width: 'fit-content',
        }
    };

    async function getCategories(): Promise<void> {
        const response = await fetchWrapper('/vendors/categories', 'GET');
        const data: string[] = (await response.json()).result;
        let breakpoint = 12;
        let numTranches = Math.ceil(data.length / breakpoint);
        let column: JSX.Element[] = [];
        let matrix: JSX.Element[][] = [];
        let passes = 0;
        data.forEach((category, i) => {
            if (i % breakpoint === 0 && i > 0 && !isMobile) {
                matrix.push(column);
                column = [];
                passes++;
            };
            column.push(
                <List key={category} sx={{ display: 'flex', alignItems: 'center', width: isMobile ? '250px' : '300px' }}>
                    {iconMapper[category]}
                    <Link
                        href={`${location.origin}/results/${category}`} 
                        target="_self"
                        underline="none"
                        color='primary.main'
                        sx={{ 
                            fontSize: '15px',
                            fontWeight: 600,
                            marginLeft: '1rem',
                            textAlign: isMobile ? 'left' : 'center',
                        }}
                        data-testid={'category link'}
                    >
                        {category}
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

    // TODO: (LOW) Figure out how to refactor this from static to dynamic
    function createHomePageCategories(childText: string): JSX.Element {
        return (
            <Grid container spacing={'5px'} mb={'24px'} data-testid={`${childText}-container`} sx={styles.gridContainer}>
                <Grid item xs={12}>
                    <Typography 
                            variant={styles.font.heading.variant}
                            component={styles.font.heading.component}
                            fontSize={styles.font.heading.fontSize}
                            fontWeight={styles.font.heading.fontWeight}
                        >
                            {childText}
                        </Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + '/results/Amazon%20FBA%20Sellers'} target="_self">
                        <img src={fba} alt="" style={styles.image} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Amazon FBA Sellers</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + '/results/Health, Beauty & Wellness'} target="_self">
                        <img src={health} alt="" style={styles.image} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Health, Beauty, & Wellness</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + `/results/Apparel & Clothing`} target="_self">
                        <img src={clothing} alt="" style={styles.image} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Apparel & Clothing</Typography>
                </Grid>
                <Grid item xs={styles.grid.xs}>
                    <a href={location.origin + '/results/Electronics'} target="_self">
                        <img src={electronics} alt="" style={styles.image} />
                    </a>
                    <Typography variant={'h6'} component={'div'} fontSize={'20px'} textAlign={'center'}>Electronics</Typography>
                </Grid>
            </Grid>
        );
    };

    useEffect(() => {
        if (!categories) getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{minHeight: '60rem', textAlign: isMobile ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Banner />
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {createHomePageCategories("Featured Categories")}
            </Container>
            <SalesBanner />
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {createCategoriesList()}
            </Container>
            <Box sx={{
                width: '100%',
                padding: '2rem 0',
                background: 'linear-gradient(0deg, #001E42, #022648, #00152d)',
                color: '#F2E5D1',
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant={'h4'} component={'h4'} fontSize={'32px'} fontWeight={600} sx={{ alignSelf: 'center'}}>
                    Get started on sourcing deals today
                </Typography>
                {cookieObject.planType !== "Premium" && isLoggedIn && 
                    <Button variant={"contained"} sx={styles.button}>
                        Upgrade to Premium
                    </Button>
                }
                {!isLoggedIn && 
                    <Button variant={"contained"} sx={styles.button}>
                        Sign Up For Free
                    </Button>
                }
            </Box>
        </Box>
    )
};

export {Home};