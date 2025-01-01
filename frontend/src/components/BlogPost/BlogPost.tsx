import { Box, Grid, Typography } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { HowToFindReliableWholesalers } from "./BlogPosts/HowToFindReliableWholeSalers";
import { FiveWaysToStreamlineInventoryManagement } from "./BlogPosts/FiveWaysToStreamlineInventoryManagement";
import { EightCommonSourcingMistakes } from "./BlogPosts/EightCommonSourcingMistakes";
import { CaseStudy } from "./BlogPosts/CaseStudy";
import { ArrowBack } from "@mui/icons-material";
import { useMobile } from "../../hooks/useMobile";

function BlogPost(): JSX.Element {
    // window.scrollTo({
    //     top: 0
    // });
    const navigate = useNavigate();
    const isMobille = useMobile();
    const [currentBlog, index] = useOutletContext<any>();
    const blogPosts = [
        HowToFindReliableWholesalers,
        FiveWaysToStreamlineInventoryManagement,
        EightCommonSourcingMistakes,
        CaseStudy,
    ];

    return (
        <Box>
            <Grid
                container
                aria-label="Blog Header" 
                sx={{ 
                    background: '#2F2F30',
                    color: '#f2e5d2',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2%'
                }}
            >
                <Grid item xs={12}>
                    <Typography
                        onClick={() => navigate("/blog")} 
                        textAlign={'left'} 
                        sx={{ cursor: "pointer" }}
                        display={'flex'}
                        alignItems={'center'}
                        fontWeight={600}
                        fontSize={18}
                        width={"fit-content"}
                    >
                        <ArrowBack sx={{marginRight: '.25rem'}}/>
                        Go Back
                    </Typography>
                </Grid>
                <Grid item marginY={'20px'} xs={6}>
                    <Typography fontSize={'48px'} fontWeight={700}>{currentBlog.title}</Typography>
                </Grid>
            </Grid>
            <Box aria-label="Blog Body">
                {blogPosts[index]}
            </Box>
        </Box>
    );
}

export {BlogPost}