import React, { useState } from "react";

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
            <input 
                type="text"
                required
                placeholder="First Name"
                name="firstName"
                className="sign-up-input"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <div>Last Name</div>
            <input 
                type="text"
                required
                placeholder="Last Name"
                name="lastName"
                className="sign-up-input"
                onChange={(e) => setLastName(e.target.value)}
            />
            <div>Email</div>
            <input 
                type="email"
                required
                placeholder="Email"
                name="email"
                className="sign-up-input"
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>Message</div>
            <input 
                type="text"
                required
                placeholder="Message"
                maxLength={1500}
                name="message"
                className="sign-up-input"
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSubmitMessage} disabled={!isDisabled()}>Submit</button>
        </div>
    );
};

export { ContactUs };