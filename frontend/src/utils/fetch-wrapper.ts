import { GoogleAuth } from "google-auth-library";

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

async function fetchWrapper(route: string, method: string, body?: any): Promise<Response> {
    const auth = new GoogleAuth();
    const client = await auth.getIdTokenClient(REACT_APP_SERVER_URI as string);
    const clientHeaders = await client.getRequestHeaders();
    let httpOptions: RequestInit;
    const httpMethodsWithBody = [
        "POST",
        "PUT",
        "PATCH"
    ];

    httpOptions = {
        method: method,
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Origin": window.location.origin,
            "Access-Control-Allow-Origin": window.location.origin,
            "Accept": "application/json",
            "Authorization": clientHeaders.Authorization,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    }
    if (httpMethodsWithBody.includes(method.toUpperCase())) {
        httpOptions.body = JSON.stringify(body);
    };
    let url: string = REACT_APP_SERVER_URI + route; 
    return await fetch(url, httpOptions);
};

export {fetchWrapper};