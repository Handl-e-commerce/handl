const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

async function fetchWrapper(route: string, method: string, body?: any): Promise<Response> {
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
            "Accept": "application/json",
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