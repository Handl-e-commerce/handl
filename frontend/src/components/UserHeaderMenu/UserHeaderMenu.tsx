import { SxProps, Grid, Button, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { EmojiEvents, KeyboardArrowDown, Logout } from '@mui/icons-material';
import { useMobile } from '../../hooks/useMobile';
import { useLoginStatus } from '../../hooks/useLoggedInStatus';
import { cookieParser, deleteCookie } from '../../utils/cookie-util';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUserHeaderMenuProps {
    sx?: SxProps;
};

const signupButtonSx: SxProps = {
    color: 'secondary.main',
    background: '#2D7FF9',
    marginRight: "4px",
    width: '100px',
};

const loginButtonSx: SxProps = {
    color: 'secondary.main',
    borderColor: 'secondary.main',
    marginLeft: "4px",
    marginRight: "20px",
    width: 'fit-content',
};

function UserHeaderMenu({ sx }: IUserHeaderMenuProps): JSX.Element {
    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const cookieObject = cookieParser();
    const isMobile: boolean = useMobile();
    const location = window.location;
    const loggedIn = useLoginStatus();
    const navigate = useNavigate();

    let isLoginOrSignUpPage: boolean = location.pathname === "/login" || location.pathname === "/sign-up";
    
    const menuSx: SxProps = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        marginLeft: isMobile ? 0 : loggedIn ? '3.5rem' : '.5rem',
        paddingRight: isMobile ? (loggedIn ? '20px' : null) : null,
    };
    
    function redirectSignUp(): void {
        // redirect to sign up route
        window.history.pushState({}, "", location.origin + "/sign-up?");
        location.replace(location.origin + "/sign-up?");
    };

    function redirectLogin(): void {
        // redirect to login page
        window.history.pushState({}, "", location.origin + "/login?");
        location.replace(location.origin + "/login?");
    };

    async function handleLogout() {
        deleteCookie("loggedIn");
        deleteCookie("firstName");
        await fetchWrapper(`/users/logout`, "POST");
        redirectLogin();
    };
    
    if (loggedIn) {
        return (
            <Grid item sx={menuSx}>
                <Button
                    variant="contained"
                    onClick={(e: React.MouseEvent<HTMLElement>) => setUserMenuAnchor(e.currentTarget)}
                    endIcon={<KeyboardArrowDown />}
                    sx={sx}
                >
                    Hi, {cookieObject?.firstName}!
                </Button>
                <Menu
                    anchorEl={userMenuAnchor}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={Boolean(userMenuAnchor)}
                    onClose={() => setUserMenuAnchor(null)}
                >
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                    {cookieObject.planType !== 'Premium' && 
                        <MenuItem onClick={() => navigate('/pricing')}>
                            <ListItemIcon>
                                <EmojiEvents />
                            </ListItemIcon>
                            Upgrade to Premium!
                        </MenuItem>
                    }
                </Menu>
            </Grid>
        )
    }
    else if (!isLoginOrSignUpPage) {
        return (
            <Grid item sx={menuSx}>
                <Button variant="contained" sx={signupButtonSx} onClick={redirectSignUp}>Sign Up</Button>
                <Button variant="outlined" sx={loginButtonSx} onClick={redirectLogin}>Login</Button>
            </Grid>
        );
    };
    return (<Grid item xs={6} />);
};

export { UserHeaderMenu };