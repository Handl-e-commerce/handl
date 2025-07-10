import { Box, Typography, Button, Paper, Avatar } from "@mui/material";
import { redirectToStripeCheckout } from "../../utils/stripe-checkout";
import { cookieParser } from "../../utils/cookie-util";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";
import { useNavigate } from "react-router-dom";
import { ReturnPolicy } from "../../components/ReturnPolicy/ReturnPolicy";
import { Paid } from "@mui/icons-material";

const styles = {
    banner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#fff',
        // background: 'linear-gradient(180deg, #022648 60%, #00509e 100%)',
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
    section: {
        p: { xs: 3, md: 5 },
        mb: 4,
        borderRadius: 4,
        boxShadow: 2,
        background: '#fff',
    },
    highlight: {
        color: '#00509e',
        fontWeight: 700,
    }
};

function Pricing(): JSX.Element {
    const cookieObject = cookieParser();
    const loggedIn = useLoginStatus();
    const planType = cookieObject.planType as string;
    const navigate = useNavigate();
    return (
        <Box>
            <Box sx={styles.banner}>
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
            <Typography variant="subtitle1" sx={{ my: 4 }}>
                Unlock all of our vendor data and features with our premium plan to help you save time and money on sourcing products and deals!
            </Typography>
            <Typography
                variant="h2"
                sx={{ fontWeight: "bold", color: "#2d7ff9", mb: 2, fontSize: { xs: "2rem", sm: "2.5rem" } }}
            >
                $899.99
            </Typography>
            <Typography variant="body1" color="text.secondary">
                <strong>One-time fee</strong> for a 1-year subscription.
            </Typography>
            {!loggedIn && <Button
                variant="contained"
                size="large"
                sx={{ mt: 4, px: 5, fontSize: "1.1rem", backgroundColor: "#2d7ff9" }}
                onClick={() => navigate('/sign-up')}
            >
                Sign Up Today
            </Button>}
            {loggedIn && planType !== 'Premium' && <Button
                variant="contained"
                size="large"
                sx={{ mt: 4, px: 5, fontSize: "1.1rem", backgroundColor: "#2d7ff9" }}
                onClick={redirectToStripeCheckout}
            >
                Go Premium Now
            </Button>}
            <ReturnPolicy sx={{ mt: 4 }}/>
        </Box>
    );
}
export {Pricing};
