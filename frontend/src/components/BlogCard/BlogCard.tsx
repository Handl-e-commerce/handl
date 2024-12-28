import { Typography, Link, SxProps, Grid } from "@mui/material";
import { useMobile } from "../../hooks/useMobile";

interface IBlogCardProps {
    title: string;
    author: string;
    link: string;
    date: string;
}

const boxSx: SxProps = {
    width: '250px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    borderRadius: '5px',
    boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 20%)',
    padding: '3%',
    transition: '0.3s',
    transitionTimingFunction: 'ease-in-out',
    '&:hover': {
        width: '265px',
        height: '300px',
    }
};

function BlogCard({ title, author, link, date }: IBlogCardProps): JSX.Element {
    const isMobile: boolean = useMobile();
    return (
        <Grid item xs={isMobile ? 10 : 3} sx={boxSx}>
            <img />
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1">{author}</Typography>
            <Typography variant="body2">{date}</Typography>
            <Link
                href={window.location.origin + "/" + link}
                target="_self"
                underline="none"
                color='#F2E5D1'
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