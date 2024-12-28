import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import { Height } from "@mui/icons-material";


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
            padding: '1.5rem',
        },
    };
    
    return (
        <Box sx={{ minHeight: '40rem'}}>
            <Box sx={styles.banner}>
                <Typography fontSize={'2.5rem'} justifySelf={'baseline'} fontWeight={600} marginBottom={'1rem'}>
                    Dive Even Deeper.
                </Typography>
                <Typography sx={{ width: '50%', fontSize: '18px' }}>
                    Stay ahead and take your sourcing to the next level with our latest insights, updates, comprehensive guides, valuable webinars, and additional resources.
                </Typography>
            </Box>
        </Box>
    );
};

export {Blogs};