import React, { useState } from "react";
import { Box, Button, Container, SxProps, TextField } from "@mui/material";
// TODO: (LOW) Implement contact us functionality for submitting messages
// import { fetchWrapper } from "../../utils/fetch-wrapper";

// const envVariables = process.env;
// const {
//     REACT_APP_SERVER_URI,
// } = envVariables;


function ContactUs(): JSX.Element {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    async function handleSubmitMessage(): Promise<void> {
        // await fetchWrapper(REACT_APP_SERVER_URI + `/users/contact-us`, 'POST', {});
        setIsSubmit(true);
    };

    function isDisabled(): boolean {
        if (firstName === "" || lastName === "" || email === "" || message === "")
            return false;
        return true;
    }

    if (isSubmit) {
        return (
            <div>
                Thanks for you message! We'll respond to you soon!
            </div>
        )
    }

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
        marginTop: '12px',
        marginBottom: '12px',
    };

    const buttonSx: SxProps = {
        width: '90%',
        marginTop: '12px',
        marginBottom: '12px',
    };

    return (
        <Container sx={{height: '100%'}}>
            <h1>Contact Us</h1>
            <Box sx={boxSx}>
                <TextField 
                    type="text"
                    required
                    placeholder="First Name"
                    name="firstName"
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                    sx={textFieldSx}
                />
                <TextField
                    type="text"
                    required
                    placeholder="Last Name"
                    name="lastName"
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}
                    sx={textFieldSx}
                />
                <TextField 
                    type="email"
                    required
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={textFieldSx}
                />
                <TextField 
                    type="text"
                    multiline
                    helperText={`${message.length}/1500`}
                    minRows={3}
                    required
                    placeholder="Message"
                    inputProps={{ maxLength: 1500 }}
                    variant="outlined"
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{...textFieldSx,}}
                />
                <Button sx={buttonSx} onClick={handleSubmitMessage} disabled={!isDisabled()} variant="contained">Submit</Button>
            </Box>
        </Container>
    );
};

export { ContactUs };