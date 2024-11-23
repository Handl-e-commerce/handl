import { useMobile } from "../../hooks/useMobile";
import { Box, Typography } from "@mui/material";
import png from '../../static/Banner Square.png';
import svg from '../../static/Banner All Horizontal.svg';

function Banner(): JSX.Element {
    let isMobile: boolean = useMobile();

    const styles = {
        banner: {
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            // flexDirection: 'column-reverse',
            color: '#F2E5D1',
            background: '#242425',
            position: 'relative',
            width: '100%',
        },
        bannerInfo: {
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            textAlign: isMobile ? 'center' : 'left',
            position: 'relative',
            padding: isMobile ? null : '10px',
            paddingBottom: '2rem',
            paddingLeft: isMobile ? null : '2rem',
            background: '#242425',
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
    
    return (
        <Box sx={styles.banner} aria-roledescription="Home Screen Banner">
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
                <img src={isMobile ? png : svg} alt="Handl Banner" width={'100%'} style={{ padding: '10px' }}/>
            </Box>
        </Box>
    )
};

export { Banner };