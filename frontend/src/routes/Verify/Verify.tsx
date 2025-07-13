import React, { useEffect, useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Box, Container, Link, SxProps } from "@mui/material";

const linkSx: SxProps = {
    marginTop: '3%',
    fontSize: '16px',
    fontWeight: 600
};

// TODO: (MEDIUM) Next on TODO list is to investigate why this is 500ing on the server in dev
function Verify(): JSX.Element {
    let queryParams = new URL(document.location.toString()).searchParams;
    let token: string = queryParams.get("token") as string;
    let userId: string = queryParams.get("userId") as string;

    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>("");

    useEffect(() => {
        handleEmailVerification(token as string, userId as string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleEmailVerification(token: string, userId: string): Promise<void> {
        const response: Response = await fetchWrapper(`/users/registration/verify`, "POST", {
            token: token,
            userId: userId
        });
        const data = await response.json();
        setResponseMessage(data.message);
        if (response.status === 201) {
            setIsVerified(true);
        }
    };

    async function handleResendVerification(userId: string): Promise<void> {
        await fetchWrapper(`/users/registration/verify/new-token`, "POST", {userId: userId});
    }

    return (
        <Container sx={{minHeight: '66rem'}} data-testid="verify-container">
            <Box className={isVerified ? "verified" : "not-verified"}>{responseMessage}</Box>
            {!isVerified && <Box>Please click <Link onClick={() => handleResendVerification(userId)} sx={linkSx}>here</Link> to resend verification link</Box>}
        </Container>
    )
};

export { Verify };