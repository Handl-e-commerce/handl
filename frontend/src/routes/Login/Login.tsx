import React, { useState } from "react";
import { fetchWrapper } from "../../utils/fetch-wrapper";
import { useNavigate } from "react-router-dom";
import { addCookie, cookieParser } from "../../utils/cookie-util";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

function Login(): JSX.Element {
    let location = window.location;
    let queryParams = new URL(document.location.toString()).searchParams;
    const navigate = useNavigate();
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [submittedResetRequest, setSubmittedResetRequest] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [showInput, setShowInput] = useState<boolean>(false);

    function redirectSignUp(): void {
        // redirect to sign up route
        queryParams.set("isBusy", "true");
        location.replace(location.origin + "/sign-up?" + queryParams.toString());
        window.history.pushState({}, "", location.origin + "/sign-up?" + queryParams.toString());
    };

    function handlePasswordResetRequest() {
        fetchWrapper(REACT_APP_SERVER_URI + "/user/password/request-reset", "POST", {
            email: email
        });
        setSubmittedResetRequest(true);
    };

    async function handleLogin() {
        setIsBusy(true);
        const response: Response = await fetchWrapper(REACT_APP_SERVER_URI + `/users/login`, "POST", {
            email: email,
            password: password
        });
        if (response.status === 201) {
            let data = await response.json();
            addCookie("loggedIn", data.loggedIn, data.expires);
            addCookie("userId", data.userId, data.expires);
            setHasError(false);
            setIsBusy(false);
            let cookies = cookieParser();
            if (cookies.loggedIn === "true") {
                let queryParams = new URL(document.location.toString()).searchParams;
                queryParams.delete("isLogin");
                window.location.replace(window.location.origin + "/" + queryParams.toString());
                return navigate("/");
            };
        }
        else {
            setHasError(true);
            setIsBusy(false);
        };
    };

    if (isForgotPassword) {
        if (submittedResetRequest) {
            return (
                <div>
                    We've sent a password reset link to your email.
                </div>
            )
        }
        return (
            <div>
                <div>Enter the email associated with your account</div>
                <input 
                    type="text"
                    placeholder="Business Email"
                    name="business_email"
                    className="login-input"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={showInput ? 'text':'password'}
                    placeholder="Password"
                    name="password"
                    className="login-input"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showInput ? <IoEyeOffOutline onClick={() => setShowInput(!showInput)}/> : <IoEyeOutline onClick={() => setShowInput(!showInput)}/>}
                <button onClick={handlePasswordResetRequest}>Request Password Reset</button>
                {hasError && <div className="error-message">The email or password you entered was incorrect</div>}
                {/* TODO: (MEDIUM) add captcha here to prevent bot requests */}
                <button className="login-button" disabled={isBusy || email.length === 0 || password.length === 0} onClick={handleLogin}>Login</button>
            </div>
        )
    }

    return (
        <div>
            <input 
                type="text"
                placeholder="Business Email"
                name="business_email"
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type={showInput ? 'text':'password'}
                placeholder="Password"
                name="password"
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
            />
            {showInput ? <IoEyeOffOutline onClick={() => setShowInput(!showInput)} data-testid="hide-password-switch"/> : <IoEyeOutline onClick={() => setShowInput(!showInput)} data-testid="show-password-switch"/>}
            <div onClick={() => setIsForgotPassword(true)}>Forgot password?</div>
            <button onClick={redirectSignUp}>Sign up for an account</button>
        </div>
    )
};

export {Login};