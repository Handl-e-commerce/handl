import { useMobile } from "../../hooks/useMobile";
import { Box, Button, Container, Typography } from "@mui/material";
import BannerSquare from '../../static/Banner_Square.png';
import ManufacturerSingle from '../../static/Manufacturer_Single.png';
import DistributorSingle from '../../static/Distributor_Single.png';
import WholesalerSingle from '../../static/Wholesaler_Single.png';
import RetailerSingle from '../../static/Retailer_Single.png';
import { cookieParser } from '../../utils/cookie-util';
import { useLoginStatus } from '../../hooks/useLoggedInStatus';
import { useNavigate } from 'react-router-dom';

function Banner(): JSX.Element {
    let isMobile: boolean = useMobile();
    const isLoggedIn = useLoginStatus();
    const cookieObject = cookieParser();
    const navigate = useNavigate();

    const singleBannerImages = [
        ManufacturerSingle,
        DistributorSingle,
        WholesalerSingle,
        RetailerSingle
    ];

    const styles = {
        banner: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            color: '#F2E5D1',
            background: 'linear-gradient(to bottom, #022648,#00152d)',
            position: 'relative',
            width: '100%',
        },
        bannerInfo: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: isMobile ? 'center' : 'left',
            position: 'relative',
            padding: isMobile ? null : '10px',
            paddingBottom: '2rem',
            paddingLeft: isMobile ? null : '2rem',
            width: isMobile ? '100%' : '50%',
        },
        aboutUs: { 
            marginTop: '4rem',
            marginBottom: '4rem',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#F2E5D1',
            background: '#3B4B59',
            borderRadius: '25px'
        },
        gridContainer: { 
            borderTop: '1.5px solid #E5E5EA',
            marginTop: '10px'
        },
        imageBox: {
            display: 'flex',
            justifyContent: 'center',
            height: '50%',
            width: isMobile ? '100%' : '50%',
        },
        button: {
            marginTop: isMobile ? '0px' : '3.5rem',
            marginBottom: isMobile ? '20px' : '0px',
            background: '#2D7FF9',
        }
    };

    const navigationButtons = () => (
        <>
            {cookieObject.planType !== "Premium" && isLoggedIn && 
                    <Button variant={"contained"} sx={styles.button} onClick={() => navigate("/pricing")}>
                        Upgrade to Premium
                    </Button>
            }
            {!isLoggedIn && 
                <Button variant={"contained"} sx={styles.button} onClick={() => navigate('/sign-up')}>
                    Sign Up For Free
                </Button>
            }
        </>
    );

    const mobileBanner = () => (
        <>
            {navigationButtons()}
            <Box sx={styles.bannerInfo} aria-roledescription="Home Screen Banner Content">
                <Typography fontSize={'1.5rem'} fontWeight={600}>
                    Source faster with the best B2B directory
                </Typography>
                <br/>
                <br/>
                <Typography>Connect with Manufactuers, Distributors, Wholesalers, and Retailers</Typography>
            </Box>
            <Box sx={styles.imageBox}>
                <img src={BannerSquare} alt="Handl Banner" width={'100%'} style={{ padding: '10px' }}/>
            </Box>
        </>
    );

    const desktopBanner = () => (
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={styles.bannerInfo} aria-roledescription="Home Screen Banner Content">
                <Typography fontSize={'2.5rem'} justifySelf={'baseline'} fontWeight={600} marginBottom={'1rem'}>
                    Source faster with the best B2B directory
                </Typography>
                <Typography>Connect with Manufactuers, Distributors, Wholesalers, and Retailers</Typography>
                {navigationButtons()}
            </Box>
            <Box sx={styles.imageBox}>
                <img src={singleBannerImages[Math.floor(Math.random() * 4)]} alt="Handl Banner" width={'70%'} style={{ padding: '10px', paddingBottom: '23px' }}/>
            </Box>
        </Container>
    );
    
    return (
        <Box sx={styles.banner} aria-roledescription="Home Screen Banner">
            {isMobile ? mobileBanner() : desktopBanner()}
        </Box>
    )
};

export { Banner };