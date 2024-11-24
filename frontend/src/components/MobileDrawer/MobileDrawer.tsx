import { useState } from 'react';
import {Grid, IconButton, Drawer, Link,  } from '@mui/material';
import { Close, Menu } from '@mui/icons-material';

interface IMobileDrawerProps {
    children: React.ReactNode;
}

function MobileDrawer({children}: IMobileDrawerProps): JSX.Element {
    const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

    return (
        <Grid item sx={{ marginLeft: '.125rem' }}>
            <IconButton onClick={() => setToggleDrawer(!toggleDrawer)}>
                <Menu sx={{color: '#F2E5D1'}}/>
            </IconButton>
            <Drawer
                anchor="left"
                open={toggleDrawer}
                onClose={() => setToggleDrawer(!toggleDrawer)}
                sx={{
                    '& .MuiDrawer-paper': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'baseline',
                        background: '#242425',
                        width: '12rem',
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        padding: '0.5rem',
                    }
                }}
            >
                <IconButton sx={{ alignSelf: 'end' }} onClick={() => setToggleDrawer(!toggleDrawer)}>
                    <Close sx={{ color: '#F2E5D1', fontSize: '26px' }}/>
                </IconButton>
                {children}
            </Drawer>
        </Grid>
    )
};

export { MobileDrawer };