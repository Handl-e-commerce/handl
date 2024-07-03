async function fetchWrapper(url: string, method: string, body?: any): Promise<Response> {
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
            "Accept": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    }
    if (httpMethodsWithBody.includes(method.toUpperCase())) {
        httpOptions.body = JSON.stringify(body);
    };
    return await fetch(url, httpOptions);
};

export {fetchWrapper};