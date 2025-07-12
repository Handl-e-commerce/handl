import { Box, Typography } from "@mui/material";

const BenefitCard = ({ Icon, text }: { Icon: React.ElementType, text: string }) => {
    return (
        <Box sx={{
            my: 2,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            p: 2.5,
            boxShadow: '0 4px 12px rgba(0, 80, 158, 0.15)',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            width: '100%',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(0, 80, 158, 0.25)',
            }
        }}>
            <Box sx={{ 
                backgroundColor: '#e6f0ff', 
                borderRadius: '50%', 
                p: 1.5, 
                mr: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon fontSize="large" sx={{ color: '#2d7ff9' }}/>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {text}
            </Typography>
        </Box>
    )
};

export { BenefitCard };