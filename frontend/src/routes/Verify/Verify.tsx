import React, { useEffect, useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Box, Container } from "@mui/material";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Verify(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    let token: string = queryParams.get("token") as string;
    let userId: string = queryParams.get("userId") as string;

    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");

    useEffect(() => {
        let ignore = false;
        handleEmailVerification(token as string, userId as string);
        return () => {
            ignore = true;
        };

    }, []);

    async function handleEmailVerification(token: string, userId: string) {
        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/registration/verify`, "POST", {
            token: token,
            userId: userId
        });
        const data = await response.json();
        setResponseMessage(data.message);
        if (response.status === 201) {
            setIsVerified(true);
        }
    };

    async function handleResendVerification(userId: string) {
        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/registration/verify/new-token`, "POST", {userId: userId});
    }

    return (
        <Container sx={{minHeight: '66rem'}} data-testid="verify-container">
            <Box className={isVerified ? "verified" : "not-verified"}>{responseMessage}</Box>
            {!isVerified && <Box>Please click <a onClick={() => handleResendVerification(userId)}>here</a> to resend verification link</Box>}
        </Container>
    )
};

export { Verify };