import React from "react";
import svg from '../../static/5_SVG-cropped.svg';

function Footer(): JSX.Element {
    let location = window.location;

    return (
        <footer style={{
            position: 'relative',
            bottom: 0,
            width: '100%',
            background: "#242425",
            color: '#F2E5D1'
        }}>
            <a href={location.origin} target="_self">
                <img src={svg} alt="Handl Logo" width={"100px"} height={"100px"}/>
            </a>
            <div><a href={location.origin + "/about-us"} target="_self">About Us</a> / <a href={location.origin + "/contact-us"} target="_self">Contact Us</a> / Privacy Policy</div>
            {/* Badges go here */}
        </footer>
    )
};

export {Footer};