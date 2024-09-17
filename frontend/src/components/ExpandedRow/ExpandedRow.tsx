import React from "react";
import { Vendor } from "../../types/types";
import { Box, Container, Typography } from "@mui/material";
import { Place, Web, Phone, Email } from "@mui/icons-material";

interface IExpandedRowProps {
    row: Vendor;
    isMobile: boolean;
};

function ExpandedRow({ row, isMobile }: IExpandedRowProps): JSX.Element {
    return (
        <Container style={{ display: "flex", flexDirection: 'column', paddingLeft: 0, marginLeft: '-10px'}} aria-roledescription="Expanded Row Container">
            <Typography
                variant={isMobile ? "h5" : "h4"}
                component={isMobile ? "h5" : "h4"}
                sx={{ marginBottom: '10px'}}
                aria-roledescription="Company Name Heading"
            >
                {row.name}
                <div style={{borderBottom: '1px solid #3C3C43', width: isMobile ? '115%': '106%' , marginLeft: isMobile ? "-2%" : '-1%' }}/>
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{marginBottom: '10px'}} aria-roledescription="About Box">
                    <Typography
                        variant={"h6"}
                        component={"h6"}
                        sx={{ marginBottom: '4px'}}
                        aria-roledescription="About Heading"
                    >
                        About
                    </Typography>
                    <Typography variant={isMobile ? 'body2' : 'body1'} component='p' paddingRight={'10px'}>{row.description}</Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'space-evenly',}}>
                    <Box>
                        <Box sx={{marginBottom: '10px'}} aria-roledescription="People Box">
                            <Typography
                                variant={"h6"}
                                component={"h6"}
                                sx={{ marginBottom: '4px'}}
                                aria-roledescription="People Heading"
                            >
                                People
                            </Typography>
                            {row.people.map((person, i) => (
                                <Typography variant={isMobile ? 'body2' : 'body1'} component='p' key={i}>{person}</Typography>
                            ))}
                        </Box>
                        <Box sx={{marginBottom: '10px'}} aria-roledescription="Categories Box">
                            <Typography
                                variant={"h6"}
                                component={"h6"}
                                sx={{ marginBottom: '4px'}}
                                aria-roledescription="Categories Heading"
                            >
                                Categories
                            </Typography>
                            {row.categories.split(",").map((category: string, i: number) => (
                                <Typography variant={isMobile ? 'body2' : 'body1'} component='p' key={i}>{category}</Typography>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{marginBottom: '10px'}} aria-roledescription="Contact Information Box">
                        <Typography
                            variant={"h6"}
                            component={"h6"}
                            sx={{ marginBottom: '4px'}}
                            aria-roledescription="Contact Information Heading"
                        >
                            Contact Information
                        </Typography>
                        <a href={row.website} style={{marginBottom: '3px'}} target='_blank'>
                            <Web style={{ verticalAlign: "middle", marginRight: '7px' }}/>
                            {row.website}
                        </a>
                        <Typography variant={isMobile ? 'body2' : 'body1'} component='p' sx={{marginBottom: '3px'}}>
                            <Phone style={{ verticalAlign: "middle", marginRight: '7px' }}/>
                            {row.phoneNumber}
                        </Typography>
                        <Typography variant={isMobile ? 'body2' : 'body1'} component='p' sx={{marginBottom: '3px'}}>
                            <Email style={{ verticalAlign: "middle", marginRight: '7px' }}/>
                            {row.email}
                        </Typography>
                        <Typography variant={isMobile ? 'body2' : 'body1'} component='pre' sx={{marginBottom: '3px'}}>
                            <Place style={{ verticalAlign: "middle", marginRight: '7px' }} />
                            {row.address + ", " + row.city + '\n\t' + row.state + ", " + row.zipcode}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export { ExpandedRow };