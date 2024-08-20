import React, { useEffect, useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser } from "../../utils/cookie-util";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";


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
    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    console.log(status);

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

    // TODO: (HIGH) Refactor this checker to work for both password and confirmation password
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
        console.log(newPassword !== confirmationPassword);
        return !(validPassword(newPassword).result || validPassword(confirmationPassword).result) || newPassword !== confirmationPassword;
    };

    if (status === undefined) {
        <div>Validating your information</div>
    };

    if (status === 401) {
        return (
            <div>{message}</div>
        )
    };

    if (status === 500) {
        throw new Error("Oops something went wrong. The link you tried to use may be broken.");
    };

    if (submitted && status === 201) {
        return (
            <>
                <h2>We've successfully reset your password.</h2>
                <p>We will send you a confirmation email shortly.</p>
            </>
        );
    };

    return (
        <Box component="form">
            <h2>Enter your new password below</h2>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <TextField 
                    id="password-input"
                    type="password"
                    defaultValue="Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!(validPassword(newPassword).result)}
                    helperText={validPassword(newPassword).message}
                    style={{width: "15%"}}
                />
                <TextField
                    id="confirmation-password-input"
                    type="password"
                    defaultValue="Password"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                    error={newPassword !== confirmationPassword}
                    helperText={newPassword !== confirmationPassword ? "Passwords do not match" : null}
                    style={{width: "15%"}}
                />
                <Button 
                    variant="contained" 
                    onClick={submitPasswordReset} 
                    style={{width: "15%"}}
                    disabled={submitDisabled()}
                >
                    Reset Password
                </Button>
            </div>
        </Box>
    );
};

export { Password };