import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

function SalesBanner(): JSX.Element {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const styles = {
        banner: {
            width: '100%',
            padding: '2rem 0',
            background: 'linear-gradient(to bottom, #022648, #00152d)',
            color: '#F2E5D1',
        },
        columnContainer: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: isMobile ? '2rem' : '1rem',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '1rem',
            flex: 1,
            borderRadius: '8px',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
            },
        },
        icon: {
            fontSize: '3rem',
            marginBottom: '1rem',
        },
        title: {
            fontWeight: 600,
            fontSize: '1.25rem',
            marginBottom: '0.75rem',
        },
        description: {
            fontSize: '0.9rem',
            maxWidth: '250px',
        },
        divider: {
            display: isMobile ? 'none' : 'block',
            width: '1px',
            height: '100px',
            backgroundColor: '#F2E5D1',
            opacity: 0.5,
        },
    };

    return (
        <Box sx={styles.banner}>
                <Box sx={styles.columnContainer}>
                    {/* Column 1 */}
                    <Box sx={styles.column}>
                        <Typography sx={styles.icon}>📋</Typography>
                        <Typography sx={styles.title}>Get key personal details</Typography>
                        <Typography sx={styles.description}>
                            Access comprehensive profiles with essential information to make informed business decisions.
                        </Typography>
                    </Box>

                    {isMobile ? null : <Box sx={styles.divider} />}

                    {/* Column 2 */}
                    <Box sx={styles.column}>
                        <Typography sx={styles.icon}>🤝</Typography>
                        <Typography sx={styles.title}>Link with the largest distributors & wholesalers</Typography>
                        <Typography sx={styles.description}>
                            Connect directly with industry leaders and expand your network of suppliers and partners.
                        </Typography>
                    </Box>

                    {isMobile ? null : <Box sx={styles.divider} />}

                    {/* Column 3 */}
                    <Box sx={styles.column}>
                        <Typography sx={styles.icon}>📈</Typography>
                        <Typography sx={styles.title}>Grow your book of business</Typography>
                        <Typography sx={styles.description}>
                            Leverage our platform to discover new opportunities and scale your business operations.
                        </Typography>
                    </Box>
                </Box>
        </Box>
    );
};

export { SalesBanner };