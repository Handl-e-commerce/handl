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
    const navigate = useNavigate();
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const [submittedResetRequest, setSubmittedResetRequest] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function redirectSignUp(): void {
        // redirect to sign up route
        location.replace(location.origin + "/sign-up?");
        window.history.pushState({}, "", location.origin + "/sign-up?");
    };

    function handlePasswordResetRequest(): void {
        fetchWrapper(REACT_APP_SERVER_URI + "/user/password/request-reset", "POST", {
            email: email
        });
        setSubmittedResetRequest(true);
    };

    async function handleLogin(): Promise<void> {
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
                    type="email"
                    placeholder="Business Email"
                    name="business_email"
                    className="login-input"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={showPassword ? 'text':'password'}
                    placeholder="Password"
                    name="password"
                    className="login-input"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? <IoEyeOffOutline onClick={() => setShowPassword(!showPassword)}/> : <IoEyeOutline onClick={() => setShowPassword(!showPassword)}/>}
                <button 
                    onClick={handlePasswordResetRequest}
                    disabled={isBusy || email.length === 0 || password.length === 0}
                >
                    Request Password Reset
                </button>
                {/* TODO: (MEDIUM) add captcha here to prevent bot requests */}
            </div>
        )
    };

    return (
        <div>
            <h1>Login to Handl</h1>
            <input 
                type="email"
                placeholder="Business Email"
                name="business_email"
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type={showPassword ? 'text':'password'}
                placeholder="Password"
                name="password"
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? <IoEyeOffOutline onClick={() => setShowPassword(!showPassword)} data-testid="hide-password-switch"/> : <IoEyeOutline onClick={() => setShowPassword(!showPassword)} data-testid="show-password-switch"/>}
            {hasError && <div className="error-message">The email or password you entered was incorrect</div>}
            <button 
                onClick={handleLogin}
                role="login-button" 
                disabled={isBusy || email.length === 0 || password.length === 0}
            >
                Login
            </button>
            <div onClick={() => setIsForgotPassword(true)}>Forgot password?</div>
            <button onClick={redirectSignUp}>Sign up for an account</button>
        </div>
    );
};

export {Login};