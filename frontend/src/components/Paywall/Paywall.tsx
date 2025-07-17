import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "../../hooks/useLoggedInStatus";

function Paywall(): JSX.Element {
    const loggedIn = useLoginStatus();
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                margin: "7px",
                p: "7px",
                width: "98%",
                background: "#022648",
                borderRadius: "10px",
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
                    background: "#2D7FF9",
                    border: "none",
                    borderRadius: "10px",
                    color: "#f2e5d1",
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": {
                        backgroundColor: "primary.main",
                    },
                }}
                onClick={loggedIn ? () => navigate("/pricing") : () => navigate("/sign-up")}
            >
                {loggedIn ? "Go Premium Now" : "Sign Up Today"}
            </Button>
        </Box>
    );
};

export { Paywall };