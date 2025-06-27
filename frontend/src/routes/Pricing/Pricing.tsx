import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

function Pricing(): JSX.Element {
    return (
        <Box
            maxWidth={500}
            mx="auto"
            my={6}
            p={4}
            component={Paper}
            elevation={3}
            textAlign="center"
        >
            <Typography variant="h4" gutterBottom>
                Pricing
            </Typography>
            <Typography variant="subtitle1" sx={{ my: 4 }}>
                Get full access to all features with our annual subscription.
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
            <Button
                variant="contained"
                size="large"
                sx={{ mt: 4, px: 5, fontSize: "1.1rem", backgroundColor: "#2d7ff9" }}
            >
                Get Started
            </Button>
        </Box>
    );
}
export {Pricing};
