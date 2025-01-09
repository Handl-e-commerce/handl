import React from "react";
import { Box, Typography } from "@mui/material";

function AboutUs(): JSX.Element {
    return (
        <Box style={{height: '35rem', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Box sx={{width: '90%'}}>
                <Typography variant="h4" sx={{ margin: '1rem', fontWeight: 600 }}>Handl: A Simpler Way to Source</Typography>
                <Typography variant="body1" component='p' sx={{margin: '14px'}}>At Handl, we believe finding new inventory should be easy, transparent, and open to everyone. We're rethinking how retailers connect with wholesalers—no more high-cost trade shows or confusing gatekeeping. Whether you need FBA items, general merchandise, or beauty products, Handl is your one-stop platform to discover and compare reliable suppliers.</Typography>
                <Typography variant="body1" component='p' sx={{margin: '14px'}}>Experience a new era of wholesale e-commerce where sourcing is straightforward, connections are clear, and growth opportunities are endless. Let's make it simpler—together.</Typography>
            </Box>
        </Box>
    )
};

export { AboutUs };