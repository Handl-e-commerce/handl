import { Box, Typography, Button, Avatar } from "@mui/material";
import { redirectToStripeCheckout } from "../../utils/stripe-checkout";
import { cookieParser } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { useNavigate } from "react-router-dom";
import { ReturnPolicy } from "../../components/ReturnPolicy/ReturnPolicy";
import { Paid, Bolt, LockOpen, ConnectWithoutContact } from "@mui/icons-material";

const styles = {
    banner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        background: 'linear-gradient(to bottom, #022648,#00152d)',
        position: 'relative',
        width: '100%',
        minHeight: '320px',
        justifyContent: 'center',
        boxShadow: '0 8px 32px 0 rgba(2,38,72,0.18)',
        mb: 6,
    },
    icon: {
        bgcolor: '#F2E5D1',
        color: '#022648',
        width: 72,
        height: 72,
        mb: 2,
        boxShadow: 3,
    },
};

const BenefitCard = ({ Icon, text }: { Icon: React.ElementType, text: string }) => {
    return (
        <Box sx={{
            my: 2,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            p: 2.5,
            boxShadow: '0 4px 12px rgba(0, 80, 158, 0.15)',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            width: '100%',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(0, 80, 158, 0.25)',
            }
        }}>
            <Box sx={{ 
                backgroundColor: '#e6f0ff', 
                borderRadius: '50%', 
                p: 1.5, 
                mr: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon fontSize="large" sx={{ color: '#2d7ff9' }}/>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {text}
            </Typography>
        </Box>
    )
};

function Pricing(): JSX.Element {
    const cookieObject = cookieParser();
    const loggedIn = useLoginStatus();
    const planType = cookieObject.planType as string;
    const navigate = useNavigate();

    return (
        <Box aria-label="pricing-page" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={styles.banner} aria-label="pricing-banner">
                <Avatar sx={styles.icon}>
                    <Paid fontSize="large" />
                </Avatar>
                <Typography fontSize={{ xs: 36, md: 54 }} sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                    Pricing
                </Typography>
                <Typography fontSize={20} sx={{ opacity: 0.85, maxWidth: 600, textAlign: 'center' }}>
                    Upgrade now to leverage our data for your sourcing needs.
                </Typography>
            </Box>
            <Box aria-label="pricing-benefits-column" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                <BenefitCard Icon={LockOpen} text="Unlock all of our vendor data and features!"/>
                <BenefitCard Icon={Bolt} text="Save time sourcing products and deals!"/>
                <BenefitCard Icon={ConnectWithoutContact} text="Get access to key personal and contact information!"/>
            </Box>
            <Box aria-label="pricing-price-column" sx={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                p: 4,
                boxShadow: '0 8px 24px rgba(0, 80, 158, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 4,
                mb: 6,
                width: '100%',
                maxWidth: '500px',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(to right, #2d7ff9, #00509e)',
                }
            }}>
                <Typography
                    variant="h6"
                    sx={{ 
                        fontWeight: 600, 
                        color: '#001E42', 
                        mb: 3,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    Premium Plan
                </Typography>
                <Typography
                    variant="h2"
                    sx={{ 
                        fontWeight: "bold", 
                        color: "#2d7ff9", 
                        mb: 1, 
                        fontSize: { xs: "2rem", sm: "2.5rem" } 
                    }}
                >
                    $899.99
                </Typography>
                <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                        mb: 4,
                        pb: 4,
                        borderBottom: '1px solid #e0e0e0',
                        width: '100%',
                        textAlign: 'center'
                    }}
                >
                    <strong>One-time fee</strong> for a 1-year subscription.
                </Typography>
                {!loggedIn && 
                <Button
                    variant="contained"
                    size="large"
                    sx={{ 
                        mt: 2, 
                        px: 5, 
                        py: 1.5,
                        fontSize: "1.1rem", 
                        backgroundColor: "#2d7ff9",
                        borderRadius: '10px',
                        boxShadow: '0 4px 12px rgba(45, 127, 249, 0.3)',
                        '&:hover': {
                            backgroundColor: '#1a6eeb',
                            boxShadow: '0 6px 16px rgba(45, 127, 249, 0.4)',
                        }
                    }}
                    onClick={() => navigate('/sign-up')}
                >
                    Sign Up Today
                </Button>
                }
                {loggedIn && planType !== 'Premium' && 
                <Box aria-label="go-premium-button" sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ 
                            mt: 2, 
                            px: 5, 
                            py: 1.5,
                            fontSize: "1.1rem", 
                            backgroundColor: "#2d7ff9",
                            borderRadius: '10px',
                            boxShadow: '0 4px 12px rgba(45, 127, 249, 0.3)',
                            '&:hover': {
                                backgroundColor: '#1a6eeb',
                                boxShadow: '0 6px 16px rgba(45, 127, 249, 0.4)',
                            }
                        }}
                        onClick={redirectToStripeCheckout}
                    >
                        Go Premium Now
                    </Button>
                    <Typography variant="body2" color="text.secondary" mt={2} sx={{ fontSize: "0.75rem" }}>
                        By clicking "Go Premium Now", you agree to our return policy.
                    </Typography>
                </Box>
                }
                <ReturnPolicy sx={{ mt: 3 }}/>
            </Box>
        </Box>
    );
}
export {Pricing};
