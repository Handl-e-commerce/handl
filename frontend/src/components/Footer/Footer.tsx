import React from "react";

function Footer(): JSX.Element {
    let location = window.location;

    return (
        <footer>
            {/* logo goes here */}
            <img src="" alt="" />
            <div><a href={location.origin + "/about-us"} target="_self">About Us</a> / <a href={location.origin + "/contact-us"} target="_self">Contact Us</a> / Privacy Policy</div>
            {/* Badges go here */}
        </footer>
    )
};

export {Footer};