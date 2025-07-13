import { Typography, Link, SxProps, Grid, Box } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import { useNavigate } from "react-router-dom";
import logo from "../../static/logo.jpg";

interface IBlogCardProps {
    title: string;
    author: string;
    description: string;
    link: string;
    date: string;
}

const boxSx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    borderRadius: '5px',
    transition: 'all .2s ease-in-out',
    padding: '1%',
    '&:hover': {
        transform: 'scale(102%)',
    }
};

function BlogCard({ title, author, description, link, date }: IBlogCardProps): JSX.Element {
    const isMobile: boolean = useMobile();
    const navigate = useNavigate();
    return (
        <Grid item sx={boxSx} xs={ isMobile ? 12 : 4}>
            <img 
                src={logo} 
                style={{
                    borderRadius: '12px',
                    cursor: 'pointer'
                }}
                onClick={() => navigate("/blog/" + link)}
                alt="Logo Blog Thumbnail"
            />
            <Box sx={{paddingLeft: '0.25rem'}}>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ 
                        margin: '7px 0px',
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/blog/" + link)}
                >
                    {title}
                </Typography>
                <Box>
                    <Typography variant="body1">{description}</Typography>
                    <Typography variant="body1" fontWeight={700} sx={{ margin: '7px 0px'}}>{author}</Typography>
                    <Typography variant="body2" sx={{ margin: '7px 0px'}}>{date}</Typography>
                </Box>
                <Link
                    href={window.location.origin + "/blog/" + link}
                    target="_self"
                    underline="none"
                    color='#3C8DBC'
                    sx={{
                        marginTop: '3%',
                        fontSize: '16px',
                        fontWeight: 600
                    }}
                >
                    Read More
                </Link>
            </Box>
        </Grid>
    );
};

export {BlogCard}