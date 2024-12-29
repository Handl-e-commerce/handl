import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { BlogCard } from "../../components/BlogCard/BlogCard";
import { Outlet, useParams } from "react-router-dom";


const styles = {
    banner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#F2E5D1',
        background: '#2F2F30',
        position: 'relative',
        width: '100%',
        padding: '60px 4%',
    },
};

function Blog(): JSX.Element {
    const params = useParams();

    const blogs: {
        title: string;
        author: string;
        description: string;
        link: string;
        date: string;
    }[] = [
        {
            title: "How to Find Reliable Wholesalers: A Step-by-Step Guide",
            author: "Handl Team",
            description: "Looking for trustworthy wholesalers to boost your inventory? Discover a step-by-step guide on how to find reliable wholesalers, verify their credentials, and streamline your sourcing process for better business growth.",
            link: "How to Find Reliable Wholesalers: A Step-by-Step Guide".replaceAll(" ", "-"),
            date: new Date(Date.now()).toDateString(),
        },
        {
            title: "5 Ways to Streamline Inventory Management for E-Commerce Retailers",
            author: "Handl Team",
            description: "Discover five proven methods for improving inventory management in e-commerce. Learn how Handl is introducing a new drag-and-drop inventory feature to help you sell smarter and faster.",
            link: "5 Ways to Streamline Inventory Management for E-Commerce Retailers".replaceAll(" ", "-"),
            date: new Date(Date.now()).toDateString(),
        },
        {
            title: "8 Common Sourcing Mistakes and How to Avoid Them",
            author: "Handl Team",
            description: "Struggling with supplier reliability and hidden fees? Learn how to avoid common sourcing mistakes and optimize your supply chain. Discover tips for vetting suppliers, negotiating terms, and using platforms like Handl for more transparent connections.",
            link: "8 Common Sourcing Mistakes and How to Avoid Them".replaceAll(" ", "-"),
            date: new Date(Date.now()).toDateString(),
        },
        {
            title: "Case Study: How Flyorsent Inc. Expanded Its Health & Beauty Supplier Network with Handl",
            author: "Handl Team",
            description: "",
            link: "Case Study: How Flyorsent Inc. Expanded Its Health & Beauty Supplier Network with Handl".replaceAll(" ", "-"),
            date: new Date(Date.now()).toDateString(),
        },
    ];

    const currentBlog = blogs.find((blog) => {
        return blog.link === params.title
    });

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center"}}>
            {!params.title && <>
                <Box sx={styles.banner}>
                    <Typography fontSize={'54px'} justifySelf={'baseline'} fontWeight={600} marginBottom={'1rem'}>
                        Dive Even Deeper.
                    </Typography>
                    <Typography sx={{ fontSize: '18px' }}>
                        Stay ahead and take your sourcing to the next level with our latest insights.
                    </Typography>
                </Box>
                <Grid
                    container
                    spacing={5}
                    marginTop={'1%'}
                    padding={'2% 6%'}
                >
                    {blogs.map((blog, i) => <BlogCard key={i} {...blog} />)}
                </Grid>
            </>}
            {params.title && <Outlet context={currentBlog}/>}
        </Box>
    );
};

export {Blog as Blogs};