
import { Box, Button, Typography } from "@mui/material";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { cookieParser } from "../../utils/cookie-util";
import { useNavigate } from "react-router-dom";
import { redirectToStripeCheckout } from "../../utils/stripe-checkout";
import { useMobile } from "../../hooks/useMobile";

function ClosingBanner(): JSX.Element {
    const cookieObject = cookieParser();
    const isLoggedIn = useLoginStatus();
    const navigate = useNavigate();
    const isMobile = useMobile();

    const styles = {
        banner: {
            width: '100%',
            height: '350px',
            padding: '2rem 0',
            background: 'linear-gradient(115deg, #022648 0%, #00152d 35%, #00509e 65%,rgb(14, 70, 173) 100%)',
            // background: "linear-gradient(rgba(2, 8, 8, 0.5), rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 90%, rgba(2, 8, 8, 0.5)), radial-gradient(at 87% 84%, rgba(2, 8, 8, 0.9) 0px, rgba(0, 0, 0, 0) 50%), radial-gradient(at 10% 8%, rgba(2, 8, 8, 0.9) 0px, rgba(0, 0, 0, 0) 50%), radial-gradient(at 65% 36%, rgba(63, 63, 75, 0.5) 0px, rgba(0, 0, 0, 0) 50%), radial-gradient(at 38% 61%, rgba(63, 63, 75, 0.5) 0px, rgba(0, 0, 0, 0) 50%), radial-gradient(at 99% 36%, rgba(63, 63, 75, 0.5) 0px, rgba(0, 0, 0, 0) 50%), radial-gradient(at 0px 62%, rgba(63, 63, 75, 0.5) 0px, rgba(0, 0, 0, 0) 50%), linear-gradient(rgb(9, 9, 10), rgb(9, 9, 10))",
            color: '#F2E5D1',
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        button: {
            marginTop: '2rem',
            marginBottom: isMobile ? '20px' : '0px',
            background: '#2D7FF9',
            width: 'fit-content',
        },
        step: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            mt: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)'
            }
        }
    }

    return (
        <Box sx={styles.banner}>
            <Typography variant={'h4'} component={'h4'} fontSize={'32px'} fontWeight={600} sx={{ alignSelf: 'center'}}>
                Start Sourcing Deals Today
            </Typography>
            <Box aria-label='steps-and-images-container' sx={{ display: 'flex'}}>
                <Box aria-label='images-container'>
                    
                </Box>
                <Box aria-label="steps-container" sx={{display: 'flex', flexDirection: 'column', alignItems: 'baseline'}}>
                    <Box sx={styles.step}>
                        <Typography variant={'h6'} component={'p'} fontSize={'18px'} sx={{m: 0, mr: 1}}>
                            <span style={{marginRight: '1rem'}}>01</span>
                            <span style={{ borderBottom: '1px solid #F2E5D1', paddingBottom: '0.5rem', fontSize: '24px'}}>Create a Handl account</span>
                        </Typography>
                    </Box>
                    <Box sx={styles.step}>
                        <Typography variant={'h6'} component={'p'} fontSize={'18px'} sx={{m: 0, mr: 1}}>
                            <span style={{marginRight: '1rem'}}>02</span>
                            <span style={{ borderBottom: '1px solid #F2E5D1', paddingBottom: '0.5rem', fontSize: '24px'}}>Upgrade to Premium</span>
                        </Typography>
                    </Box>
                    <Box sx={styles.step}>
                        <Typography variant={'h6'} component={'p'} fontSize={'18px'} sx={{m: 0, mr: 1}}>
                            <span style={{marginRight: '1rem'}}>03</span>
                            <span style={{ borderBottom: '1px solid #F2E5D1', paddingBottom: '0.5rem', fontSize: '24px'}}>Connect with distributors and wholesalers</span>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box aria-label="buttons">
                {cookieObject.planType !== "Premium" && isLoggedIn && 
                    <Button variant={"contained"} sx={styles.button} onClick={redirectToStripeCheckout}>
                        Upgrade to Premium
                    </Button>
                }
                {!isLoggedIn && 
                    <Button variant={"contained"} sx={styles.button} onClick={() => navigate('/sign-up')}>
                        Sign Up For Free
                    </Button>
                }
            </Box>
        </Box>
    )
};

export {ClosingBanner};