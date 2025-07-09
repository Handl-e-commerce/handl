import { Box, Typography, Button, Paper } from "@mui/material";
import { redirectToStripeCheckout } from "../../utils/stripe-checkout";
import { cookieParser } from "../../utils/cookie-util";

function Pricing(): JSX.Element {
    const cookieObject = cookieParser();
    const planType = cookieObject.planType as string;
    return (
        <Box
            maxWidth={'80%'}
            mx="auto"
            my={6}
            p={4}
            component={Paper}
            elevation={3}
            textAlign="center"
        >
            <Typography fontSize={'54px'} justifySelf={'baseline'} fontWeight={600} marginBottom={'1rem'}>
                Pricing
            </Typography>
            <Typography variant="subtitle1" sx={{ my: 4 }}>
                Get full access to all features with our annual subscription.
            </Typography>
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
            {planType !== 'Premium' && <Button
                variant="contained"
                size="large"
                sx={{ mt: 4, px: 5, fontSize: "1.1rem", backgroundColor: "#2d7ff9" }}
                onClick={redirectToStripeCheckout}
            >
                Go Premium Now
            </Button>}
        </Box>
    );
}
export {Pricing};
