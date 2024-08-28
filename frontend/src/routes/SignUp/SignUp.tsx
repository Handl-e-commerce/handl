import React, { useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Box, Button, FormControl, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function SignUp(): JSX.Element {
    let location = window.location;
    
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [businessName, setBusinessName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState<string>("");
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const states = [
        {
            "name":"--",
            "abbreviation":"--"
        },
        {
            "name":"Alabama",
            "abbreviation":"AL"
        },
        {
            "name":"Alaska",
            "abbreviation":"AK"
        },
        {
            "name":"Arizona",
            "abbreviation":"AZ"
        },
        {
            "name":"Arkansas",
            "abbreviation":"AR"
        },
        {
            "name":"California",
            "abbreviation":"CA"
        },
        {
            "name":"Colorado",
            "abbreviation":"CO"
        },
        {
            "name":"Connecticut",
            "abbreviation":"CT"
        },
        {
            "name":"Delaware",
            "abbreviation":"DE"
        },
        {
            "name":"Florida",
            "abbreviation":"FL"
        },
        {
            "name":"Georgia",
            "abbreviation":"GA"
        },
        {
            "name":"Hawaii",
            "abbreviation":"HI"
        },
        {
            "name":"Idaho",
            "abbreviation":"ID"
        },
        {
            "name":"Illinois",
            "abbreviation":"IL"
        },
        {
            "name":"Indiana",
            "abbreviation":"IN"
        },
        {
            "name":"Iowa",
            "abbreviation":"IA"
        },
        {
            "name":"Kansas",
            "abbreviation":"KS"
        },
        {
            "name":"Kentucky",
            "abbreviation":"KY"
        },
        {
            "name":"Louisiana",
            "abbreviation":"LA"
        },
        {
            "name":"Maine",
            "abbreviation":"ME"
        },
        {
            "name":"Maryland",
            "abbreviation":"MD"
        },
        {
            "name":"Massachusetts",
            "abbreviation":"MA"
        },
        {
            "name":"Michigan",
            "abbreviation":"MI"
        },
        {
            "name":"Minnesota",
            "abbreviation":"MN"
        },
        {
            "name":"Mississippi",
            "abbreviation":"MS"
        },
        {
            "name":"Missouri",
            "abbreviation":"MO"
        },
        {
            "name":"Montana",
            "abbreviation":"MT"
        },
        {
            "name":"Nebraska",
            "abbreviation":"NE"
        },
        {
            "name":"Nevada",
            "abbreviation":"NV"
        },
        {
            "name":"New Hampshire",
            "abbreviation":"NH"
        },
        {
            "name":"New Jersey",
            "abbreviation":"NJ"
        },
        {
            "name":"New Mexico",
            "abbreviation":"NM"
        },
        {
            "name":"New York",
            "abbreviation":"NY"
        },
        {
            "name":"North Carolina",
            "abbreviation":"NC"
        },
        {
            "name":"North Dakota",
            "abbreviation":"ND"
        },
        {
            "name":"Ohio",
            "abbreviation":"OH"
        },
        {
            "name":"Oklahoma",
            "abbreviation":"OK"
        },
        {
            "name":"Oregon",
            "abbreviation":"OR"
        },
        {
            "name":"Pennsylvania",
            "abbreviation":"PA"
        },
        {
            "name":"Rhode Island",
            "abbreviation":"RI"
        },
        {
            "name":"South Carolina",
            "abbreviation":"SC"
        },
        {
            "name":"South Dakota",
            "abbreviation":"SD"
        },
        {
            "name":"Tennessee",
            "abbreviation":"TN"
        },
        {
            "name":"Texas",
            "abbreviation":"TX"
        },
        {
            "name":"Utah",
            "abbreviation":"UT"
        },
        {
            "name":"Vermont",
            "abbreviation":"VT"
        },
        {
            "name":"Virginia",
            "abbreviation":"VA"
        },
        {
            "name":"Washington",
            "abbreviation":"WA"
        },
        {
            "name":"West Virginia",
            "abbreviation":"WV"
        },
        {
            "name":"Wisconsin",
            "abbreviation":"WI"
        },
        {
            "name":"Wyoming",
            "abbreviation":"WY"
        }
    ];

    function isNumericInput(event: React.KeyboardEvent<HTMLDivElement>): boolean {
        const key = event.key;
        return ((key >= "0" && key <= "9"));
    };
    
    function isModifierKey(event: React.KeyboardEvent<HTMLDivElement>): boolean {
        const key = event.key;
        return (event.shiftKey === true || key === "Home" || key === "End") || // Allow Shift, Home, End
            (key === "Backspace" || key === "Tab" || key === "Enter" || key === "Delete") || // Allow Backspace, Tab, Enter, Delete
            (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown") || // Allow left, up, right, down
            (
                // Allow Ctrl/Command + A,C,V,X,Z
                (event.ctrlKey === true || event.metaKey === true) &&
                (key === "a" || key === "c" || key === "v" || key === "x" || key === "z")
            )
    };
    
    function enforceFormat(event: React.KeyboardEvent<HTMLDivElement>): void {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if (!isNumericInput(event) && !isModifierKey(event)) {
            event.preventDefault();
        }
    };
    
    function formatToPhone(event: React.KeyboardEvent<HTMLDivElement>): void {
        if(isModifierKey(event)) {return;}
    
        // I am lazy and don't like to type things more than once
        const target = event.target as HTMLInputElement;
        const input = target.value.replace(/\D/g,'').substring(0,10); // First ten digits of input only
        const zip = input.substring(0,3);
        const middle = input.substring(3,6);
        const last = input.substring(6,10);
    
        if(input.length > 6){target.value = `(${zip})-${middle}-${last}`;}
        else if(input.length > 3){target.value = `(${zip})-${middle}`;}
        else if(input.length > 0){target.value = `(${zip}`;}
    };

    async function createAccount() {
        setIsBusy(true);
        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/register`, "POST", {
            email: email,
            businessName: businessName,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            password: password
        });
        if (response.status === 201) {
            setIsBusy(false);
            setSignUpSuccess(true);
        }
        else {
            setIsBusy(false);
            setSignUpSuccess(false);
        };
    };

    function canSubmit(): boolean {
        if (isBusy)
            return false;
        if (email === "" || businessName === "" || firstName === "" || lastName === "" || phoneNumber === "" || address === "" || city === "" || state === "--" || zipcode === "")
            return false;
        return true;
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

    if(signUpSuccess) {
        return (
            <div className="sign-up-container" data-testid="successful-registration">
                <h1>You've successfully signed up for Handl!</h1>
                <div>We've just sent you a verification email. Click the link in the email to confirm your email!</div>
                <div>The link expires in 30 mins</div>
            </div>
        )
    };

    return (
        <Box className="sign-up-container" data-testid="default-form">
            <h1>Sign Up Free</h1>
            <div>Already a member? <a href={location.origin + "/login?"}>{"Login ->"}</a></div>
            <TextField 
                type="email"
                value={email}
                variant="outlined"
                required
                hiddenLabel
                placeholder="Business Email"
                name="business_email"
                data-testid="email-input"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField 
                type="text"
                value={businessName}
                variant="outlined"
                required
                hiddenLabel
                placeholder="Business Name"
                name="business_name"
                data-testid="business-name-input"
                onChange={(e) => setBusinessName(e.target.value)}
            />
            <TextField 
                type="text"
                value={firstName}
                variant="outlined"
                required
                hiddenLabel
                placeholder="First Name"
                name="first_name"
                data-testid="first-name-input"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField 
                type="text"
                value={lastName}
                variant="outlined"
                required
                hiddenLabel
                placeholder="Last Name"
                name="last_name"
                data-testid="last-name-input"
                onChange={(e) => setLastName(e.target.value)}
            />
            <TextField 
                type="tel"
                value={phoneNumber}
                variant="outlined"
                required
                hiddenLabel
                onKeyDown={(e) => enforceFormat(e)}
                onKeyUp={(e) => formatToPhone(e)}
                placeholder="Phone Number"
                name="phone number"
                data-testid="phone-number-input"
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField 
                type="text"
                value={address}
                variant="outlined"
                required
                hiddenLabel
                placeholder="Address"
                name="Address"
                data-testid="address-input"
                onChange={(e) => setAddress(e.target.value)}
            />
            <TextField 
                type="text"
                value={city}
                variant="outlined"
                required
                hiddenLabel
                placeholder="City"
                name="City"
                data-testid="city-input"
                onChange={(e) => setCity(e.target.value)}
            />
            <FormControl sx={{ width: 70 }}>
                <Select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    renderValue={() => state}
                    SelectDisplayProps={{
                        // @ts-ignore
                        "data-testid" : "state-selector"
                    }}
                >
                    {states.map((state) => (
                        <MenuItem key={state.abbreviation} value={state.abbreviation} data-testid="menu-item">
                            <ListItemText primary={state.abbreviation}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField 
                type="text"
                value={zipcode}
                variant="outlined"
                required
                hiddenLabel
                placeholder="Zipcode"
                onKeyDown={(e) => enforceFormat(e)}
                name="zipcode"
                data-testid="zipcode-input"
                onChange={(e) => setZipcode(e.target.value)}
            />
            <TextField
                type={showPassword ? 'text':'password'}
                value={password}
                variant="outlined"
                required
                hiddenLabel
                placeholder="Password"
                name="password"
                data-testid="password-input"
                onChange={(e) => {
                    validPassword(e.target.value);
                    setPassword(e.target.value);
                }}
            />
            {showPassword ? <VisibilityOff onClick={() => setShowPassword(!showPassword)}/> : <Visibility onClick={() => setShowPassword(!showPassword)}/>}
            {invalidPasswordMessage !== "" && <div data-testid="invalid-password-message">{invalidPasswordMessage}</div>}
            <Button className="create-account-button" variant="contained" disabled={!canSubmit()} onClick={createAccount} data-testid="registration-button">Register</Button>
            {signUpSuccess === false ? <div className="sign-up-error" data-testid="sign-up-error">User already exists.</div> : null}
        </Box>
    );
};

export { SignUp };