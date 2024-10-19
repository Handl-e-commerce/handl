import React from "react";
import svg from '../../static/5_SVG-cropped.svg';
import { LinkedIn, Reddit } from "@mui/icons-material";
import { Box, SxProps } from "@mui/material";


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
            marginTop: '1.5rem',
            padding: '10px',
            height: '250px',
            width: '100%',
            background: "#242425",
            color: '#F2E5D1'
        }}>
            <a href={location.origin} target="_self">
                <img src={svg} alt="Handl Logo" width={"100px"} height={"100px"}/>
            </a>
            <div><a href={location.origin + "/about-us"} target="_self">About Us</a> / <a href={location.origin + "/contact-us"} target="_self">Contact Us</a> / Privacy Policy</div>
            <Box aria-label="social-icons-container">
                <LinkedIn href="https://www.linkedin.com/company/handl/" target="_blank" sx={iconSx}/>
                <Reddit href="https://www.reddit.com/r/handl/" target="_blank" sx={iconSx}/>
            </Box>
        </footer>
    )
};

export {Footer};