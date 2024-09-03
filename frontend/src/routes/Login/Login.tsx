import React, { useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { addCookie, cookieParser } from "../../utils/cookie-util";
import { Box, Button, Container, InputAdornment, SxProps, TextField, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Login(): JSX.Element {
    let location = window.location;
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [submittedResetRequest, setSubmittedResetRequest] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function redirectSignUp(): void {
        // redirect to sign up route
        window.history.pushState({}, "", location.origin + "/sign-up?");
        location.replace(location.origin + "/sign-up?");
    };

    function handlePasswordResetRequest(): void {
        fetchWrapper(REACT_APP_SERVER_URI + "/users/password/reset/request", "POST", {
            email: email
        });
        setSubmittedResetRequest(true);
    };

    async function handleLogin(): Promise<void> {
        setIsBusy(true);
        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/login`, "POST", {
            email: email,
            password: password
        });
        if (response.status === 201) {
            let data = await response.json();
            addCookie("loggedIn", data.loggedIn, data.expires);
            addCookie("userId", data.userId, data.expires);
            addCookie("firstName", data.firstName, data.expires);
            setHasError(false);
            setIsBusy(false);
            let cookies = cookieParser();
            if (cookies.loggedIn === "true") {
                let queryParams = new URL(document.location.toString()).searchParams;
                window.location.replace(window.location.origin + "/" + queryParams.toString());
            };
        }
        else {
            setHasError(true);
            setIsBusy(false);
        };
    };
    
    const containerSx: SxProps = {
        height: '100%',
        marginBottom: '7px',
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
        alignItems: 'center',
    };

    const boxSx: SxProps = {
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: '8px',
        padding: '7px'
    }

    const textFieldSx: SxProps = {
        width: '90%',
        marginTop: '24px',
        marginBottom: '24px',
    };

    const ButtonSx: SxProps = {
        width: '90%',
        marginTop: '24px',
        marginBottom: '24px',
    };

    if (isForgotPassword) {
        if (submittedResetRequest) {
            return (
                <div style={{height: '100%'}}>
                    We've sent a password reset link to your email.
                </div>
            )
        }
        return (
            <Container sx={containerSx}>
                <h3>Enter the email associated with your account</h3>
                <Box sx={boxSx}>
                    <TextField 
                        type="email"
                        placeholder="Business Email"
                        name="business_email"
                        variant="outlined"
                        className="login-input"
                        role="reset-password-email-input"
                        sx={textFieldSx}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                        onClick={handlePasswordResetRequest}
                        variant='contained'
                        disabled={isBusy || email.length === 0}
                        sx={ButtonSx}
                    >
                        Request Password Reset
                    </Button>
                    {/* TODO: (MEDIUM) add captcha here to prevent bot requests */}
                </Box>
            </Container>
        )
    };


    return (
        <Container sx={containerSx}
        >
            <h1>Login to Handl</h1>
            <Box sx={boxSx}>
                <TextField 
                    type="email"
                    placeholder="Business Email"
                    name="business_email"
                    variant="outlined"
                    sx={textFieldSx}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    type={showPassword ? 'text':'password'}
                    placeholder="Password"
                    name="password"
                    variant="outlined"
                    sx={textFieldSx}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                            endAdornment: 
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge='end'
                                    sx={{width: '40px', alignItems: 'center'}}
                                >
                                    {showPassword ? <VisibilityOff data-testid="hide-password-switch"/> : <Visibility data-testid="show-password-switch"/>} 
                                </IconButton>
                            </InputAdornment>
                    }}
                />
                {hasError && 
                    <div className="error-message">The email or password you entered was incorrect</div>
                }
                <Button 
                    onClick={handleLogin}
                    role="login-button" 
                    variant="contained"
                    disabled={isBusy || email.length === 0 || password.length === 0}
                    sx={ButtonSx}
                >
                    Login
                </Button>
                <Typography
                    style={{cursor: 'pointer', textAlign: 'left', paddingLeft: '27px', width: '90%'}}
                    onClick={() => setIsForgotPassword(true)}
                >
                    <u>Forgot password?</u>
                </Typography>
                <Button variant='outlined' sx={ButtonSx} onClick={redirectSignUp}><u>Sign up for an account</u></Button>
            </Box>
        </Container>
    );
};

export {Login};