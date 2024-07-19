import React from "react";

function Home(): JSX.Element {
    let location = window.location;
    let queryParams = new URL(document.location.toString()).searchParams;

    return (
        <div>
            Welcome to Handl!
            <div>
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
            <div>
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