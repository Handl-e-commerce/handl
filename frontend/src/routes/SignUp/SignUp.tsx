import React, { useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

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
    const [EIN, setEIN] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const [zipcode, setZipcode] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState<string>("");
    const [signUpSuccess, setSignUpSuccess] = useState<boolean>();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function isNumericInput(event: React.KeyboardEvent<HTMLInputElement>): boolean {
        const key = event.key;
        return ((key >= "0" && key <= "9"));
    };
    
    function isModifierKey(event: React.KeyboardEvent<HTMLInputElement>): boolean {
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
    
    function enforceFormat(event: React.KeyboardEvent<HTMLInputElement>): void {
        // Input must be of a valid number format or a modifier key, and not longer than ten digits
        if (!isNumericInput(event) && !isModifierKey(event)) {
            event.preventDefault();
        }
    };
    
    function formatToPhone(event: React.KeyboardEvent<HTMLInputElement>): void {
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
            EIN: EIN,
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
        if (email === "" || businessName === "" || firstName === "" || lastName === "" || phoneNumber === "" || EIN === "" || address === "" || city === "" || state === "--" || zipcode === "")
            return false;
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

    return (
        <div className="sign-up-container" data-testid="default-form">
            <h1>Sign Up Free</h1>
            <div>Already a member? <a href={location.origin + "/login?"}>{"Login ->"}</a></div>
            <input 
                type="email"
                required
                placeholder="Business Email"
                name="business_email"
                className="sign-up-input"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="text"
                required
                placeholder="Business Name"
                name="business_name"
                className="sign-up-input"
                onChange={(e) => setBusinessName(e.target.value)}
            />
            <input 
                type="text"
                required
                placeholder="First Name"
                name="first_name"
                className="sign-up-input"
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
                type="text"
                required
                placeholder="Last Name"
                name="last_name"
                className="sign-up-input"
                onChange={(e) => setLastName(e.target.value)}
            />
            <input 
                type="tel"
                required
                id="phone"
                pattern="([0-9]{3})-[0-9]{3}-[0-9]{4}"
                onKeyDown={(e) => enforceFormat(e)}
                onKeyUp={(e) => formatToPhone(e)}
                placeholder="Phone Number"
                name="phone number"
                className="sign-up-input"
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input 
                type="text"
                required
                placeholder="EIN"
                name="EIN"
                pattern="[0-9]{9}"
                onKeyDown={(e) => enforceFormat(e)}
                maxLength={9}
                className="sign-up-input"
                onChange={(e) => setEIN(e.target.value)}
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
                required
                placeholder="City"
                name="City"
                className="sign-up-input"
                onChange={(e) => setCity(e.target.value)}
            />
            <select 
                className="state-selector" 
                required
                value={state}
                onChange={(e) => {setState(e.target.value)}}
            >
                <option value="--">--</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
            <input 
                type="text"
                required
                placeholder="Zipcode"
                max={5}
                pattern="[0-9]{5}"
                onKeyDown={(e) => enforceFormat(e)}
                name="Zipcode"
                className="sign-up-input"
                onChange={(e) => setZipcode(e.target.value)}
            />
            <input
                type={showPassword ? 'text':'password'}
                required
                maxLength={32}
                placeholder="Password"
                name="password"
                className="sign-up-input"
                onChange={(e) => {
                    validPassword(e.target.value);
                    setPassword(e.target.value);
                }}
            />
            {showPassword ? <IoEyeOffOutline onClick={() => setShowPassword(!showPassword)}/> : <IoEyeOutline onClick={() => setShowPassword(!showPassword)}/>}
            {invalidPasswordMessage !== "" && <div>{invalidPasswordMessage}</div>}
            <button className="create-account-button" disabled={!canSubmit()} onClick={createAccount}>Register</button>
            {signUpSuccess === false ? <div className="sign-up-error">User already exists.</div> : null}
        </div>
    );
};

export { SignUp };