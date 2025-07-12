import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import { cookieParser } from "../../utils/cookie-util";
import Home from "@mui/icons-material/Home";
import { redirectToStripeCheckout } from "../../utils/stripe-checkout";
import { Error, Loop } from "@mui/icons-material";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";

function Subscribe(): JSX.Element {
    const { status } = useParams<{ status: string }>();
    const navigate = useNavigate();
    const cookiesObject = cookieParser();
    const loggedIn = useLoginStatus();

    useEffect(() => {
        if ((status !== 'success' && status !== "cancel") || !loggedIn) {
            navigate('/pricing');
        }
    }, [status, navigate, loggedIn]);
    
    const renderContent = () => {
        if (status === 'success') {
            return (
                <Box textAlign="center" my={4}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Thanks {cookiesObject.firstName}!
                    </Typography>
                    <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
                    <Typography variant="h4" fontWeight="bold" gutterBottom mt={2}>
                        Subscription Confirmed!
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Thank you for subscribing to our annual plan.
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                        <EmailIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body1">
                            A confirmation email with your receipt has been sent to your registered email address.
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" mt={2}>
                        Your subscription is now active and you have full access to all of our data.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<Home />} 
                        onClick={() => navigate('/')}
                        sx={{ mt: 2 }}
                    >
                        Go to Home
                    </Button>
                </Box>
            );
        }
        else {
            return (
                <Box textAlign="center" my={4}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Checkout Failed
                    </Typography>
                    <Error color="error" sx={{ fontSize: 80 }} />
                    <Typography variant="body1" paragraph>
                        We're sorry, but something went wrong with your checkout. Please try again.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
                        <Button
                            variant="contained" 
                            color="primary" 
                            startIcon={<Loop />} 
                            onClick={redirectToStripeCheckout}
                        >
                            Try Again
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<Home />} 
                            onClick={() => navigate('/')}
                        >
                            Go to Home
                        </Button>
                    </Box>
                </Box>
            );
        }
    };
    
    return (
        <Container maxWidth="md">
            {renderContent()}
        </Container>
    );
}

export {Subscribe};