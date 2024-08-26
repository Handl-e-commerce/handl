import React from "react";
import svg from '../../static/5_SVG.svg';

function Footer(): JSX.Element {
    let location = window.location;

    return (
        <footer>
            <img src={svg} alt="Handl Logo" width={"100px"} height={"100px"}/>
            <div><a href={location.origin + "/about-us"} target="_self">About Us</a> / <a href={location.origin + "/contact-us"} target="_self">Contact Us</a> / Privacy Policy</div>
            {/* Badges go here */}
        </footer>
    )
};

export {Footer};