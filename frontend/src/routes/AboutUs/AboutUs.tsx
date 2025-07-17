import React from "react";
import { Box, Typography, Container, Paper, Divider, Avatar, Stack } from "@mui/material";
import HandshakeIcon from '@mui/icons-material/Handshake'; // Changed icon import

const styles = {
    banner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#F2E5D1',
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

function AboutUs(): JSX.Element {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fb' }}>
            <Box sx={styles.banner}>
                <Avatar sx={styles.icon}>
                    <HandshakeIcon fontSize="large" /> {/* Changed icon here */}
                </Avatar>
                <Typography fontSize={{ xs: 36, md: 54 }} sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
                    Handl: A Simpler Way to Source
                </Typography>
                <Typography fontSize={20} sx={{ opacity: 0.85, maxWidth: 600, textAlign: 'center' }}>
                    Empowering retailers and wholesalers to connect, grow, and thrive—without barriers.
                </Typography>
            </Box>
            <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
                <Paper elevation={3} sx={styles.section}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        Who We Are
                    </Typography>
                    <Typography variant="body1" fontSize={18} sx={{ mb: 2 }}>
                        At <span style={styles.highlight}>Handl</span>, we believe sourcing inventory should be <b>easy</b>, <b>transparent</b>, and <b>accessible</b> to everyone. Our platform reimagines how retailers connect with wholesalers—eliminating high-cost trade shows and confusing gatekeeping.
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        What We Offer
                    </Typography>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                        <Box flex={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                                For Retailers
                            </Typography>
                            <Typography variant="body2" fontSize={16}>
                                Discover and compare reliable suppliers for <b>FBA items</b>, <b>general merchandise</b>, <b>beauty products</b>, and more—all in one place.
                            </Typography>
                        </Box>
                        <Box flex={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                                For Wholesalers
                            </Typography>
                            <Typography variant="body2" fontSize={16}>
                                Reach new customers, showcase your products, and grow your business with a transparent, open marketplace.
                            </Typography>
                        </Box>
                    </Stack>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" fontSize={18}>
                        We’re building a new era of wholesale e-commerce where sourcing is straightforward, connections are clear, and growth opportunities are endless. <span style={styles.highlight}>Let’s make it simpler—together.</span>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

export { AboutUs };