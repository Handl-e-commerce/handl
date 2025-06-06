import React from "react";
import { Box, Button } from "@mui/material";

function Paywall(): JSX.Element {
    return (
        <Box
            sx={{
                mt: "7px",
                mb: "7px",
                p: "7px",
                width: "97%",
                background: "#022648",
                border: "1px solid #022648",
                borderRadius: "8px",
                textAlign: "center",
            }}
        >
            <Box>
                <Box component="h3" sx={{ m: '7px', color: "#f2e5d1", fontWeight: "bold", fontSize: "1.25rem" }}>
                    Subscribe to Access All Data
                </Box>
                <Box component="p" sx={{ color: "#f2e5d1", fontSize: "1rem" }}>
                    Subscribe to unlock full access to our complete dataset.
                </Box>
            </Box>
            <Button
                sx={{
                    m: "10px",
                    padding: "8px 24px",
                    background: "#f2e5d1",
                    border: "none",
                    borderRadius: "4px",
                    color: "#022648",
                    fontWeight: "bold",
                    cursor: "pointer",
                }}
                onClick={() => {
                    // Replace with your subscribe modal logic
                    alert("Subscribe modal coming soon!");
                }}
            >
                Subscribe Now
            </Button>
        </Box>
    );
};

export { Paywall };