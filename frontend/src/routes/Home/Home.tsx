import React from "react";
import fba from '../../static/FBA.jpg';
import clothing from '../../static/Clothing.jpg';
import health from '../../static/Health & Beauty.jpg';
import electronics from '../../static/Electronics.jpg';


function Home(): JSX.Element {
    let location = window.location;

    // TODO: (LOW) Implement dynamic route creation for redirects and populating of categories
    return (
        <div style={{minHeight: '60rem'}}>
            <div data-testid="most-viewed-categories-container">
                <h2>Most Viewed Categories</h2>
                <div>
                    <a href={location.origin + '/results?categories=amazon-fba'} target="_self">
                        <img src={fba} alt="" />
                    </a>
                    <div>Amazon FBA</div>
                </div>
                <div>
                    <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                        <img src={health} alt="" />
                    </a>
                    <div>Health & Beauty</div>
                </div>
                <div>
                    <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                        <img src={clothing} alt="" />
                    </a>
                    <div>Clothing</div>
                </div>
                <div>
                    <a href={location.origin + '/results?categories=electronics'} target="_self">
                        <img src={electronics} alt="" />
                    </a>
                    <div>Electronics</div>
                </div>
            </div>
            <div data-testid="featured-categories-container">
                <h2>Featured Categories</h2>
                <div>
                    <a href={location.origin + '/results?categories=amazon-fba'} target="_self">
                        <img src={fba} alt="" />
                    </a>
                    <div>Amazon FBA</div>
                </div>
                <div>
                    <a href={location.origin + '/results?categories=Cosmetics+%2F+Nails+%2F+Hair+Products'} target="_self">
                        <img src={health} alt="" />
                    </a>
                    <div>Health & Beauty</div>
                </div>
                <div>
                    <a href={location.origin + `/results?categories=Hats+%2F+Scarves%2CKids+%2F+Baby+Apparel%2CKids+%2F+Baby+Footwear%2CMen's+Apparel%2CMen's+Footwear%2CUndergarments+%2F+Hosiery+%2F+Socks%2CWomen's+Apparel%2CWomen's+Footwear`} target="_self">
                        <img src={clothing} alt="" />
                    </a>
                    <div>Clothing</div>
                </div>
                <div>
                    <a href={location.origin + '/results?categories=electronics'} target="_self">
                        <img src={electronics} alt="" />
                    </a>
                    <div>Electronics</div>
                </div>
            </div>
        </div>
    )
};

export {Home};