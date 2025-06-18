import React, { useEffect } from "react";
import { cookieParser, addCookie } from "../../utils/cookie-util";

function Redirect(): JSX.Element {
    let location = window.location;
    let queryParams = new URL(document.location.toString()).searchParams;
    
    useEffect(() => {
        let token = queryParams.get("token") as string;
        let userId = queryParams.get("userId") as string;
        addCookie("token", token);
        addCookie("userId", userId);
        let cookieObject = cookieParser();
        if (cookieObject.token && cookieObject.userId) {
            window.history.pushState({}, "", location.origin + "/reset/password");
            location.replace(location.origin + "/reset/password");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>Redirecting to password reset page...</div>
};

export { Redirect };