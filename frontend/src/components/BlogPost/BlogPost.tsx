import { Box, Typography } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";

function BlogPost(): JSX.Element {
    const navigate = useNavigate();
    const currentBlog: {
        title: string;
        author: string;
        description: string;
        link: string;
        date: string;
    } = useOutletContext();

    window.scrollTo({
        top: 0
    });

    return (
        <Box>
            <Box aria-label="Blog Header">
                <Typography onClick={() => navigate("/blog")} sx={{ cursor: "pointer" }}>Go Back</Typography>
                <Typography variant="h4">{currentBlog.title}</Typography>
            </Box>
            <Box aria-label="Blog Body">

            </Box>
        </Box>
    );
}

export {BlogPost}