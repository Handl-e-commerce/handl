import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import { cookieParser } from "../../utils/cookie-util";
import Home from "@mui/icons-material/Home";

function Subscribe(): JSX.Element {
    const { status } = useParams<{ status: string }>();
    const navigate = useNavigate();
    const cookiesObject = cookieParser();

    useEffect(() => {
        if (status !== 'success' && status !== "cancel") {
            navigate('/pricing');
        }
    }, [status, navigate]);
    
    const renderContent = () => {
        return (
            <Box textAlign="center" my={4}>
                <Typography variant="h4" gutterBottom>
                    Thanks {cookiesObject.firstName}!
                </Typography>
                <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
                <Typography variant="h4" gutterBottom mt={2}>
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
                <Typography variant="body2" color="text.secondary" mt={3}>
                    Your subscription is now active and you have full access to all of our data.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<Home />} 
                    onClick={() => navigate('/')}
                    sx={{ mt: 4 }}
                >
                    Go to Home
                </Button>
            </Box>
        );
    };
    
    return (
        <Container maxWidth="md">
            {renderContent()}
        </Container>
    );
}

export {Subscribe};