import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import { BlogCard } from "../../components/BlogCard/BlogCard";


function Blogs(): JSX.Element {
    const isMobile: boolean = useMobile();

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

    const blogs: {
        title: string;
        author: string;
        link: string;
        date: string;
    }[] = [];

    for (let i = 0; i < 10; i++) {
        blogs.push({
            title: "Lorem Ipsum",
            author: "Aaron Isakov",
            link: "",
            date: new Date(Date.now()).toDateString(),
        });
    };
    
    return (
        <Box sx={{ minHeight: '40rem'}}>
            <Box sx={styles.banner}>
                <Typography fontSize={'54px'} justifySelf={'baseline'} fontWeight={600} marginBottom={'1rem'}>
                    Dive Even Deeper.
                </Typography>
                <Typography sx={{ width: '50%', fontSize: '18px' }}>
                    Stay ahead and take your sourcing to the next level with our latest insights, updates, comprehensive guides, valuable webinars, and additional resources.
                </Typography>
            </Box>
            <Grid
                container
                columns={9}
                spacing={5}
                padding={'4% 9.5%'}
            >
                {blogs.map(blog => <BlogCard {...blog} />)}
            </Grid>
        </Box>
    );
};

export {Blogs};