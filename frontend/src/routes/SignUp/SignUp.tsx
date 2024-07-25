import React, { useState } from "react";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;


function SignUp(): JSX.Element {
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [businessName, setBusinessName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [EIN, setEIN] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>();

    async function createAccount() {
        setIsBusy(true);
        const response: Response = await fetch(REACT_APP_SERVER_URI + `/users/create`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Origin": "*",
                "Accept": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                email: email,
                businessName: businessName,
                phoneNumber: phoneNumber,
                password: password
            })
        });
        if (response.status === 201) {
            setIsBusy(false);
            setSignUpSuccess(true);
        }
        else {
            setIsBusy(false);
            setSignUpSuccess(false);
        };
    }

    function canSubmit(): boolean {
        if (isBusy)
            return false;
        if (email === "" || businessName === "" || phoneNumber === "" || password === "")
            return false;
        // TODO: (LOW) Implement logic for automatically formating and handling phone numbers
        if (phoneNumber) {}
        return true;
    }

    if(signUpSuccess) {
        return (
            <div className="sign-up-container" data-testid="successful-registration">
                <h1>You've successfully signed up for Handl!</h1>
                <div>We've just sent you a verification email. Click the link in the email to confirm your email!</div>
                <div>The link expires in 30 mins</div>
            </div>
        )
    }

    return (
        <div className="sign-up-container" data-testid="default-form">
            <h1>Create your Handl account today!</h1>
            <input 
                type="text"
                placeholder="Business Email"
                name="business_email"
                className="sign-up-input"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Business Name"
                name="business_name"
                className="sign-up-input"
                onChange={(e) => setBusinessName(e.target.value)}
            />
            <input 
                type="text"
                placeholder="First Name"
                name="first_name"
                className="sign-up-input"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Last Name"
                name="last_name"
                className="sign-up-input"
                onChange={(e) => setLastName(e.target.value)}
            />
            <input 
                type="tel" 
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                required
                placeholder="Phone Number ex: 000-000-0000"
                name="phone number"
                className="sign-up-input"
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Address"
                name="Address"
                className="sign-up-input"
                onChange={(e) => setAddress(e.target.value)}
            />
            <input 
                type="text"
                placeholder="City"
                name="City"
                className="sign-up-input"
                onChange={(e) => setCity(e.target.value)}
            />
            <input 
                type="text"
                placeholder="State"
                name="State"
                className="sign-up-input"
                onChange={(e) => setState(e.target.value)}
            />
            <input 
                type="text"
                placeholder="Zipcode"
                name="Zipcode"
                className="sign-up-input"
                onChange={(e) => setZipcode(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                className="sign-up-input"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="create-account-button" disabled={!canSubmit()} onClick={createAccount}>Create Account</button>
            {signUpSuccess === false ? <div className="sign-up-error">User already exists.</div> : null}
        </div>
    );
};

export { SignUp };