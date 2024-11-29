import { useMobile } from "../../hooks/useMobile";
import { Box, Typography } from "@mui/material";
import png from '../../static/Banner Square.png';
import svg from '../../static/Banner All Horizontal.svg';
import ManufacturerSingle from '../../static/Manufacturer_Single.png';
import DistributorSingle from '../../static/Distributor_Single.png';
import WholesalerSingle from '../../static/Wholesaler_Single.png';
import RetailerSingle from '../../static/Retailer_Single.png';

function Banner(): JSX.Element {
    let isMobile: boolean = useMobile();

    const styles = {
        banner: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            color: '#F2E5D1',
            background: '#2F2F30',
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
        }
    };

    const mobileBanner = () => (
        <>
            <Box sx={styles.bannerInfo} aria-roledescription="Home Screen Banner Content">
                <Typography fontSize={'3.5rem'}>
                    Sourcing made easy.
                </Typography>
                <Typography variant={ isMobile ? "subtitle2" : "subtitle1" } pr={'1rem'}>
                    Sourcing sucks. So we built Handl to help connect manufacturers, distributors, wholesalers, and retailers together without friction and wondering how to get in touch.
                    <br/>
                    <br/>
                    Handl is the world's fastest growing B2B directory for manufacturers, distributors, wholesalers, and retailers. 
                </Typography>
            </Box>
            <Box sx={styles.imageBox}>
                <img src={png} alt="Handl Banner" width={'100%'} style={{ padding: '10px' }}/>
            </Box>
        </>
    );

    const desktopBanner = () => (
        <>
            <Box sx={styles.bannerInfo} aria-roledescription="Home Screen Banner Content">
                <Typography fontSize={'3.5rem'}>
                    Sourcing made easy.
                </Typography>
                <Typography variant={ isMobile ? "subtitle2" : "subtitle1" } pr={'1rem'}>
                    Sourcing sucks. So we built Handl to help connect manufacturers, distributors, wholesalers, and retailers together without friction and wondering how to get in touch.
                    <br/>
                    <br/>
                    Handl is the world's fastest growing B2B directory for manufacturers, distributors, wholesalers, and retailers. 
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'center' }}>
                <img src={ManufacturerSingle} width={'75%'} style={{ padding: '10px' }}/>
                <img src={DistributorSingle} width={'75%'} style={{ padding: '10px' }}/>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '25%', alignItems: 'center' }}>
                <img src={WholesalerSingle} width={'75%'} style={{ padding: '10px' }}/>
                <img src={RetailerSingle} width={'75%'} style={{ padding: '10px' }}/>
            </Box>
        </>
    );
    
    return (
        <Box sx={styles.banner} aria-roledescription="Home Screen Banner">
            {isMobile ? mobileBanner() : desktopBanner()}
        </Box>
    )
};

export { Banner };