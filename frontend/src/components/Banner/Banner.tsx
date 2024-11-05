import { useMobile } from "../../hooks/useMobile";
import { Box, Button, SxProps, Typography } from "@mui/material";
import { ArrowForward } from '@mui/icons-material';

// <Container>
//     <Box sx={styles.aboutUs} aria-roledescription="Home Screen Brief About Us">
//         <Typography variant={ isMobile ? "h6" : "h4"} m={1}>
//            
//         </Typography>
//         <Typography variant={ isMobile ? "body2" : "h5"} m={1}>
//             
//         </Typography>
//         <Button sx={buttonSx} onClick={redirectResults}>View our entire directory of wholesalers and distributors</Button>
//     </Box>
// </Container>

function Banner(): JSX.Element {
    let location = window.location;
    let isMobile: boolean = useMobile();

    function redirectResults(): void {
        // redirect to results page
        window.history.pushState({}, "", location.origin + "/results?");
        location.replace(location.origin + "/results?");
    };

    const styles = {
        banner: {
            display: 'flex',
            flexDirection: isMobile ? 'column-reverse' : 'row',
            color: '#F2E5D1',
            background: '#242425',
            position: 'relative',
            width: '100%',
        },
        bannerInfo: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: isMobile ? 'center' : 'left',
            position: 'relative',
            padding: 5,
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
    };
    
    const buttonSx: SxProps = {
        padding: '7px 16px',
        color: 'secondary.main',
        background: '#3B4B59',
        marginRight: "4px",
        borderRadius: '5px',
        textTransform: 'none',
        fontSize: '1rem'
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
                    <br/>
                    <br/>
                    <Button
                        sx={buttonSx}
                        onClick={redirectResults}
                        endIcon={<ArrowForward />}
                    >
                        View our entire directory
                    </Button>
                </Typography>
            </Box>
            <Box>
                Image goes here
            </Box>
        </Box>
    )
};

export { Banner };