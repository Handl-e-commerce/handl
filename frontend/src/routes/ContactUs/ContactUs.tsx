import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
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

    return (
        <Box>
            <h1>Contact Us</h1>
            <div>First Name</div>
            <TextField 
                type="text"
                required
                placeholder="First Name"
                name="firstName"
                variant="outlined"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <div>Last Name</div>
            <TextField
                type="text"
                required
                placeholder="Last Name"
                name="lastName"
                variant="outlined"
                onChange={(e) => setLastName(e.target.value)}
            />
            <div>Email</div>
            <TextField 
                type="email"
                required
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>Message</div>
            <TextField 
                type="text"
                multiline
                required
                placeholder="Message"
                inputProps={{ maxLength: 1500 }}
                variant="outlined"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSubmitMessage} disabled={!isDisabled()} variant="contained">Submit</Button>
        </Box>
    );
};

export { ContactUs };