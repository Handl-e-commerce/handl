import React from "react";

function Home(): JSX.Element {
    let location = window.location;

    // TODO: (LOW) Implement dynamic route creation for redirects and populating of categories
    return (
        <div>
            Welcome to Handl!
            <div data-testid="most-viewed-categories-container">
                <div>Most Viewed Categories</div>
                <div>
                    <a href={location.origin + '/results?category=amazon-fba'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Amazon FBA</div>
                </div>
                <div>
                    <a href={location.origin + '/results?category=health-and-beauty'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Health & Beauty</div>
                </div>
                <div>
                    <a href={location.origin + '/results?category=clothing'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Clothing</div>
                </div>
                <div>
                    <a href={location.origin + '/results?category=electronics'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Electronics</div>
                </div>
            </div>
            <div data-testid="featured-categories-container">
                <div>Featured Categories</div>
                <div>
                    <a href={location.origin + '/results?category=amazon-fba'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Amazon FBA</div>
                </div>
                <div>
                    <a href={location.origin + '/results?category=health-and-beauty'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Health & Beauty</div>
                </div>
                <div>
                    <a href={location.origin + '/results?category=clothing'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Clothing</div>
                </div>
                <div>
                    <a href={location.origin + '/results?category=electronics'} target="_self">
                        <img src="" alt="" />
                    </a>
                    <div>Electronics</div>
                </div>
            </div>
        </div>
    )
};

export {Home};