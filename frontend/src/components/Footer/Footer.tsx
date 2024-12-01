import React from "react";
import goldLogoTransparent from '../../static/Gold_Logo_Transparent_Image.png';
import { LinkedIn, Reddit } from "@mui/icons-material";
import { Box, Link, SxProps, Typography } from "@mui/material";


function Footer(): JSX.Element {
    let location = window.location;

    const iconSx: SxProps = {
        width: '36px', 
        height: '36px',
        margin: '5px',
        marginTop: '10px',
    }

    return (
        <footer style={{
            position: 'relative',
            bottom: 0,
            marginTop: '1rem',
            padding: '10px',
            height: '100%',
            width: '100%',
            background: "#242425",
            color: '#F2E5D1'
        }}>
            <a href={location.origin} target="_self">
                <img src={goldLogoTransparent} alt="Handl Logo" width={"110px"} height={"40px"}/>
            </a>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Typography m={1}>
                    <Link href={location.origin + "/about-us"} target="_self" underline="none" color='#F2E5D1'>
                        About Us
                    </Link>
                </Typography>
                <Typography m={1}>
                    <Link href={location.origin + "/contact-us"} target="_self" underline="none" color='#F2E5D1'>
                        Contact Us
                    </Link> 
                </Typography>
                <Typography m={1}>
                    Privacy Policy
                </Typography>
            </Box>
            <Box aria-label="social-icons-container">
                <Link href="https://www.linkedin.com/company/handl-technologies/" underline="none" target="_blank" rel="noreferrer" color='#F2E5D1'>
                    <LinkedIn sx={iconSx}/>
                </Link>
                <Link href="https://www.reddit.com/r/handl/" underline="none" target="_blank" rel="noreferrer" color='#F2E5D1'>
                    <Reddit sx={iconSx}/>
                </Link>
            </Box>
        </footer>
    )
};

export {Footer};