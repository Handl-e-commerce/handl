import React, { useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, ListItemText, MenuItem, Select, SxProps, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { states } from "../../utils/constants";

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
    const [state, setState] = useState<string>("--");
    const [zipcode, setZipcode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState<string>("");
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>();
    const [showPassword, setShowPassword] = useState<boolean>(false);

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
        const response: Response = await fetchWrapper(`/users/register`, "POST", {
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

    const containerSx: SxProps = {
        minHeight: '56rem',
        marginBottom: '7px',
        display: 'flex',
        flexDirection: 'column',
        width: '95%',
        alignItems: 'center',
    };

    const boxSx: SxProps = {
        borderRadius: '8px',
        padding: '7px',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
    }

    const textFieldSx: SxProps = {
        width: '80%',
        marginTop: '7px',
    };

    const buttonSx: SxProps = {
        width: '80%',
        height: '7.5%',
        marginTop: '7px',
        marginBottom: '24px',
    };

    if(signUpSuccess) {
        return (
            <Container sx={containerSx} data-testid="successful-registration">
                <h1>You've successfully signed up for Handl!</h1>
                <div>We've just sent you a verification email. Click the link in the email to confirm your email!</div>
                <div>The link expires in 30 mins</div>
            </Container>
        )
    };

    return (
        <Container sx={containerSx}>
            <h1>Sign Up Free</h1>
            <Box className="sign-up-container" data-testid="default-form" sx={boxSx}>
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
                    onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                    sx={textFieldSx}
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
                    sx={textFieldSx}
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
                    sx={textFieldSx}
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
                    sx={textFieldSx}
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
                    sx={textFieldSx}
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
                    sx={textFieldSx}
                />
                <Box sx={{marginTop: '7px'}}>
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
                        sx={{width: '35%',}}
                    />
                    <FormControl sx={{ width: '20%'}}>
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
                        sx={{ width: '25%' }}
                    />
                </Box>
                <TextField
                    type={showPassword ? 'text':'password'}
                    value={password}
                    variant="outlined"
                    required
                    hiddenLabel
                    placeholder="Password"
                    name="password"
                    data-testid="password-input"
                    inputProps={{ maxLength: 32 }}
                    onChange={(e) => {
                        validPassword(e.target.value);
                        setPassword(e.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    data-testid='password-toggle-icon'
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge='end'
                                    sx={{width: '40px', alignItems: 'center'}}
                                >
                                    {showPassword ? <VisibilityOff data-testid="hide-password-switch"/> : <Visibility data-testid="show-password-switch"/>} 
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={textFieldSx}
                    />
                {invalidPasswordMessage !== "" && <div data-testid="invalid-password-message">{invalidPasswordMessage}</div>}
                <Button className="create-account-button" variant="contained" disabled={!canSubmit()} onClick={createAccount} data-testid="registration-button" sx={buttonSx}>Register</Button>
                {signUpSuccess === false ? <div className="sign-up-error" data-testid="sign-up-error">User already exists.</div> : null}
            </Box>
        </Container>
    );
};

export { SignUp };