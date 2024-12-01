import React from "react";
import { Vendor } from "../../types/types";
import { Box, Container, Link, SxProps, Typography } from "@mui/material";
import { Place, Web, Phone, Email } from "@mui/icons-material";

interface IExpandedRowProps {
    row: Vendor;
    isMobile: boolean;
};

function ExpandedRow({ row, isMobile }: IExpandedRowProps): JSX.Element {
    const styles = {
        container: {
            display: "flex",
            flexDirection: 'column',
            paddingLeft: 0,
            marginLeft: '-10px'
        },
        allCompanyInfo: {
            display: 'flex',
            flexDirection: 'column',
        },
        companyProfile: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'flex-start',
            alignItems: 'baseline',
            width: isMobile ? '90%' : '100%',
            marginBottom: '10px',
        },
        contactInfoRow: {
            marginBottom: '3px'
        },
        peopleCategories: {
            marginRight: isMobile ? 0 : 10,
            width: isMobile ? '100%' : '50%',
        },
        contactInformation: {
            marginLeft: isMobile ? 0 : 10,
            width: isMobile ? '100%' : '50%',
        },
        icon: {
            verticalAlign: "middle",
            marginRight: '7px',
        }
    };

    function companyAddress(): JSX.Element | undefined {
        const googleMapsUrl: string = "https://www.google.com/maps/search/?api=1&";
        if (row.address && row.city && row.state && row.zipcode) {
            const params = new URLSearchParams({
                query: row.address + ", " + row.city + ", " + row.state + ", " + row.zipcode
            });
            return (
                <Typography variant={isMobile ? 'body2' : 'body1'} component='pre' sx={styles.contactInfoRow}>
                    <Place style={{ verticalAlign: "middle", marginRight: '7px' }} />
                    <Link href={googleMapsUrl + params} target="_blank" rel="noreferrer">
                        {row.address + ", " + row.city + ", " + row.state + ", " + row.zipcode}
                    </Link>
                </Typography>    
            )
        }

        let address = "";
        if (row.address) {
            address = row.address.trim() + ", ";
        };
        if (row.city) {
            address = address + row.city.trim() + ", ";
        };
        if (row.state) {
            address = address + row.state.trim();
        };
        if (row.zipcode) {
            address = address + ", " + row.zipcode.trim();
        };
        
        if (address !== "") {
            return (
                <Typography variant={isMobile ? 'body2' : 'body1'} component='pre' sx={styles.contactInfoRow} color='#3C8DBC'>
                    <Place style={{ verticalAlign: "middle", marginRight: '7px' }} />
                    {address}
                </Typography>
            );
        };
    };

    return (
        <Container sx={styles.container} aria-roledescription="Expanded Row Container">
            <Typography
                variant={isMobile ? "h6" : "h4"}
                component={isMobile ? "h6" : "h4"}
                sx={{ marginBottom: '10px'}}
                aria-roledescription="Company Name Heading"
            >
                {row.name}
                <div style={{borderBottom: '1px solid #3C3C43'}}/>
            </Typography>
            <Box sx={styles.allCompanyInfo} aria-roledescription="All Company Info Box">
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
                <Box sx={styles.companyProfile} aria-roledescription="Company Profile">
                    <Box sx={styles.peopleCategories} aria-roledescription="People Categories Box">
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
                    <Box sx={styles.contactInformation} aria-roledescription="Contact Information Box">
                        <Typography
                            variant={"h6"}
                            component={"h6"}
                            sx={{ marginBottom: '4px'}}
                            aria-roledescription="Contact Information Heading"
                        >
                            Contact Information
                        </Typography>
                        {row.website && 
                            <Link href={row.website} style={styles.contactInfoRow} sx={{ fontSize : '1rem' }} target="_blank" rel="noreferrer" color='#3C8DBC'>
                                <Web style={styles.icon} />
                                {row.website}
                            </Link>
                        }
                        {row.phoneNumber && 
                            <Typography variant={isMobile ? 'body2' : 'body1'} component='p' sx={styles.contactInfoRow}>
                                <Phone style={styles.icon}/>
                                {row.phoneNumber}
                            </Typography>
                        }
                        {row.email && 
                            <Typography variant={isMobile ? 'body2' : 'body1'} component='p' sx={styles.contactInfoRow}>
                                <Email style={styles.icon}/>
                                {row.email}
                            </Typography>
                        }
                        {companyAddress()}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export { ExpandedRow };