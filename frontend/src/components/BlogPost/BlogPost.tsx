import { Box, Typography } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { HowToFindReliableWholesalers } from "./BlogPosts/HowToFindReliableWholeSalers";
import { FiveWaysToStreamlineInventoryManagement } from "./BlogPosts/FiveWaysToStreamlineInventoryManagement";
import { EightCommonSourcingMistakes } from "./BlogPosts/EightCommonSourcingMistakes";
import { CaseStudy } from "./BlogPosts/CaseStudy";

function BlogPost(): JSX.Element {
    window.scrollTo({
        top: 0
    });
    const navigate = useNavigate();
    const [currentBlog, index] = useOutletContext<any>();
    const blogPosts = [
        HowToFindReliableWholesalers,
        FiveWaysToStreamlineInventoryManagement,
        EightCommonSourcingMistakes,
        CaseStudy,
    ];

    return (
        <Box>
            <Box aria-label="Blog Header" sx={{ 
                    background: '#2F2F30',
                    color: '#f2e5d2',
                    height: '200px',
                    marginBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography onClick={() => navigate("/blog")} textAlign={'left'} sx={{ cursor: "pointer" }}>Go Back</Typography>
                <Typography variant="h4">{currentBlog.title}</Typography>
            </Box>
            <Box aria-label="Blog Body">
                {blogPosts[index]}
            </Box>
        </Box>
    );
}

export {BlogPost}