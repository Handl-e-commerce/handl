import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;


function ContactUs(): JSX.Element {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    // TODO: (LOW) Implement contact us functionality for submitting messages
    function handleSubmitMessage(): void {
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
        <div>
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
        </div>
    );
};

export { ContactUs };