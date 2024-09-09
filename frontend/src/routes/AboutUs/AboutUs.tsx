import React from "react";
import handshake from "../../static/about_us_background.jpg";
import { Box, Typography } from "@mui/material";

function AboutUs(): JSX.Element {
    return (
        <Box style={{height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Box sx={{width: '90%'}}>
                <Typography variant="h4" component='h4'>Handl: Revolutionizing Wholesale E-Commerce</Typography>
                <Typography variant="body1" component='p' sx={{margin: '14px'}}>At Handl, we envision a world where the e-commerce industry is transparent, efficient, and accessible to all. We believe the current market is plagued by inefficiencies, gate-keeping, and costly trade shows as the primary means of discovering new inventory sources. Our mission is to dismantle these barriers, democratizing information to seamlessly connect retailers with wholesalers.</Typography>
                <Typography variant="body1" component='p' sx={{margin: '14px'}}>Handl is your ultimate destination for sourcing inventory, whether you're looking for FBA sellers, general merchandise, or cosmetics. We are dedicated to simplifying the process for underserved e-commerce retailers, ensuring that finding new suppliers is no longer a daunting task.</Typography>
                <Typography variant="body1" component='p' sx={{margin: '14px'}}>Experience a new era of e-commerce with Handl.</Typography>
                <img src={handshake} alt="About Us background handshake vector" width='90%'/>
            </Box>
        </Box>
    )
};

export { AboutUs };