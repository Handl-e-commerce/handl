import React, { useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { addCookie, cookieParser } from "../../utils/cookie-util";
import { Box, Button, TextField } from "@mui/material";
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

    if (isForgotPassword) {
        if (submittedResetRequest) {
            return (
                <div>
                    We've sent a password reset link to your email.
                </div>
            )
        }
        return (
            <Box>
                <div>Enter the email associated with your account</div>
                <TextField 
                    type="email"
                    placeholder="Business Email"
                    name="business_email"
                    variant="outlined"
                    className="login-input"
                    role="reset-password-email-input"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button 
                    onClick={handlePasswordResetRequest}
                    disabled={isBusy || email.length === 0}
                >
                    Request Password Reset
                </Button>
                {/* TODO: (MEDIUM) add captcha here to prevent bot requests */}
            </Box>
        )
    };

    return (
        <Box>
            <h1>Login to Handl</h1>
            <TextField 
                type="email"
                placeholder="Business Email"
                name="business_email"
                variant="outlined"
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                type={showPassword ? 'text':'password'}
                placeholder="Password"
                name="password"
                variant="outlined"
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? <VisibilityOff onClick={() => setShowPassword(!showPassword)} data-testid="hide-password-switch"/> : <Visibility onClick={() => setShowPassword(!showPassword)} data-testid="show-password-switch"/>}
            {hasError && <div className="error-message">The email or password you entered was incorrect</div>}
            <Button 
                onClick={handleLogin}
                role="login-button" 
                variant="contained"
                disabled={isBusy || email.length === 0 || password.length === 0}
            >
                Login
            </Button>
            <div onClick={() => setIsForgotPassword(true)}>Forgot password?</div>
            <Button onClick={redirectSignUp}>Sign up for an account</Button>
        </Box>
    );
};

export {Login};