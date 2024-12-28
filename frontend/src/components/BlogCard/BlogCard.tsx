import { Typography, Link, SxProps, Grid } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";
import logo from "../../static/logo.jpg";

interface IBlogCardProps {
    title: string;
    author: string;
    link: string;
    date: string;
}

const boxSx: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    borderRadius: '5px',
    transition: 'all .2s ease-in-out',
    '&:hover': {
        transform: 'scale(105%)',
    }
};

function BlogCard({ title, author, link, date }: IBlogCardProps): JSX.Element {
    const isMobile: boolean = useMobile();
    return (
        <Grid item sx={boxSx} xs={ isMobile ? 12 : 4}>
            <img 
                src={logo} 
                style={{ borderRadius: '5px' }}
            />
            <Typography variant="h5" sx={{ margin: '7px 0px'}}>{title}</Typography>
            <Typography variant="body1" fontWeight={700} sx={{ margin: '7px 0px'}}>{author}</Typography>
            <Typography variant="body2">{date}</Typography>
            <Link
                href={window.location.origin + "/" + link}
                target="_self"
                underline="none"
                color='#3C8DBC'
                sx={{
                    fontSize: '16px',
                    fontWeight: 600
                }}
            >
                Read More
            </Link>
        </Grid>
    );
};

export {BlogCard}