import React, { useEffect, useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { cookieParser } from "../../utils/cookie-util";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Password(): JSX.Element {
    let cookieObject = cookieParser();
    const [status, setStatus] = useState<number>();
    const [message, setMessage] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmationPassword, setConfirmationPassword] = useState<string>("");
    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState<string>("");

    useEffect(() => {
        verifyResetToken();
    }, []);

    async function verifyResetToken(): Promise<void> {
        if (cookieObject.userId === undefined || cookieObject.token === undefined) {
            setStatus(500);
        };

        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/password/reset/verify`, "POST", {
            userId: cookieObject.userId as string,
            token: cookieObject.token as string,
        });
        const data = await response.json();
        setStatus(data.status);
        setMessage(data.message);
    };

    async function submitPasswordReset() {

    };

    function validPassword(password: string): boolean {
        if (password.length < 8) {
            setInvalidPasswordMessage("Password is too short");
            return false;
        };
        if (!RegExp("[0-9]").test(password)) {            
            setInvalidPasswordMessage("Password must contain a number");
            return false;
        };
        if (!RegExp("[a-z]+").test(password)) {
            setInvalidPasswordMessage("Password must contain a lowercase letter");
            return false;
        };
        if (!RegExp("[A-Z]+").test(password)) {
            setInvalidPasswordMessage("Password must contain an uppercase letter");
            return false;
        };
        if (!(/[~`!#$%^&*€£@+=\-[\]';,/{}()|":<>?._]/g).test(password)) {
            setInvalidPasswordMessage("Password must contain a special character from the following: ~ ` ! # $ % ^ & * € £ @ + = - [ ] ' ; , / { } ( ) | \" : < > ? . _");
            return false;
        };
        setInvalidPasswordMessage("");
        return true;
    };

    if (status === undefined) {
        <div>Validating your information</div>
    }

    if (status === 401) {
        return (
            <div>{message}</div>
        )
    };

    if (status === 500) {
        throw new Error("Oops something went wrong. The link you tried to use may be broken.");
    };

    return (
        <Box component="form">
            <h2>Enter your new password below</h2>
            <div>
                <TextField 
                    error={validPassword(password)}
                    id="password-input"
                    type="password"
                    defaultValue="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField 
                    error={validPassword(confirmationPassword)}
                    id="confirmation-password-input"
                    type="password"
                    defaultValue="Password"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                />
            </div>
        </Box>
    );
};

export { Password };