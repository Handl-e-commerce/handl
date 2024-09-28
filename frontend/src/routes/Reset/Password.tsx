import React, { useEffect, useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser, deleteCookie } from "../../utils/cookie-util";
import { Button, Box, TextField, SxProps, Typography } from "@mui/material";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Password(): JSX.Element {
    let cookieObject = cookieParser();
    const [status, setStatus] = useState<number>();
    const [message, setMessage] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmationPassword, setConfirmationPassword] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            verifyResetToken();
        };
        return () => { ignore = true };
    }, []);

    async function verifyResetToken(): Promise<void> {
        if (cookieObject.userId === undefined || cookieObject.token === undefined) {
            setStatus(500);
        };

        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/password/reset/verify`, "POST", {
            userId: cookieObject.userId as string,
            token: cookieObject.token as string,
        });
        const data = await response.json();
        setStatus(response.status);
        setMessage(data.message);
        deleteCookie("token");
    };

    async function submitPasswordReset() {
        let userId: string = cookieObject.userId as string;
        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/${userId}/password`, "PUT", {
            newPassword: newPassword
        });
        const data = await response.json();
        setStatus(response.status);
        setMessage(data.message);
        setSubmitted(true); 
    };

    function validPassword(password: string): {result: boolean, message: string} {
        if (password.length < 8) {
            return { result: false, message: "Password is too short" };
        };
        if (!RegExp("[0-9]").test(password)) {
            return { result: false, message: "Password must contain a number" };
        };
        if (!RegExp("[a-z]+").test(password)) {
            // setInvalidPasswordMessage("Password must contain a lowercase letter");
            return { result: false, message: "Password must contain a lowercase letter" };
        };
        if (!RegExp("[A-Z]+").test(password)) {
            return { result: false, message: "Password must contain a uppercase letter" };
        };
        if (!(/[~`!#$%^&*€£@+=\-[\]';,/{}()|":<>?._]/g).test(password)) {
            return { result: false, message: "Password must contain a special character from the following: ~ ` ! # $ % ^ & * € £ @ + = - [ ] ' ; , / { } ( ) | \" : < > ? . _" };
        };
        return { result: true, message: "" };
    };

    function submitDisabled(): boolean {
        return !(validPassword(newPassword).result || validPassword(confirmationPassword).result) || newPassword !== confirmationPassword;
    };

    if (!status) {
        <Typography id='success-message' variant='subtitle1' component='p' sx={{margin: '10px'}}>Validating your information</Typography>
    };

    if (status === 401) {
        return (
            <Typography id='success-message' variant='subtitle1' component='p' sx={{margin: '10px'}}>{message}</Typography>
        )
    };

    if (status === 500) {
        throw new Error("Oops something went wrong. The link you tried to use may be broken.");
    };

    if (submitted && status === 201) {
        return (
            <Box sx={{height: '70rem'}}>
                <Typography id='success-title' variant='h4' component='h4' sx={{margin: '10px'}}>We've successfully reset your password.</Typography>
                <Typography id='success-message' variant='subtitle1' component='p' sx={{margin: '10px'}}>We will send you a confirmation email shortly.</Typography>
            </Box>
        );
    };

    const textFieldSx: SxProps = {
        width: '90%',
        marginTop: '12px',
        marginBottom: '12px',
    };

    const buttonSx: SxProps = {
        width: '90%',
        marginTop: '12px',
        marginBottom: '12px',
        padding: '25px',
    };

    return (
        <Box component="form" role="password-reset-form" sx={{height: '70rem'}}>
            <h2>Enter your new password below</h2>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <TextField 
                    id="password-input"
                    role="password-input"
                    type="password"
                    defaultValue="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!(validPassword(newPassword).result)}
                    helperText={validPassword(newPassword).message}
                    sx={textFieldSx}
                />
                <TextField
                    id="confirmation-password-input"
                    role="confirmation-password-input"
                    type="password"
                    defaultValue="Password"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                    error={newPassword !== confirmationPassword}
                    helperText={newPassword !== confirmationPassword ? "Passwords do not match" : null}
                    sx={textFieldSx}
                />
                <Button 
                    variant="contained" 
                    role="password-reset-button"
                    onClick={submitPasswordReset}
                    disabled={submitDisabled()}
                    sx={buttonSx}
                >
                    Reset Password
                </Button>
            </div>
        </Box>
    );
};

export { Password };