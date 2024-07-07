function cookieParser(): { [k: string]: string; } {
    const cookiesObject = Object.fromEntries(document.cookie.split('; ').map(c => {
        const [ key, ...v ] = c.split('=');
        return [ key, v.join('=') ];
    }));
    return cookiesObject;
};

function deleteCookie(key: string): void {
    document.cookie = key +`=; Path=/;Expires=${new Date(1).toString()}; SameSite=none; Secure;`;
};

function addCookie(key: string, value: string, expires?: string): void {
    let expiresDate = expires ? new Date(expires).toString() : "Session";
    document.cookie = `${key}=${value};Path=/;Expires=${expiresDate}; SameSite=None; Secure;`;
};

export {cookieParser, deleteCookie, addCookie};