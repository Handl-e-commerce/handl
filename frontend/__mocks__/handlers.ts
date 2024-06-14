import { http, HttpResponse } from 'msw';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

export const handlers = [
    http.post(REACT_APP_SERVER_URI + `/users/login`, ({ request, params, cookies }) => {
        let body = JSON.stringify({
            message: "Successfully authenticated user",
        });
        let responseCookies: string[] = [
            "selector=MockSelectorValue; HttpOnly; Secure; SameSite=None; MaxAge=9999999999999999;",
            "validator=MockValidatorValue; HttpOnly; Secure; SameSite=None; MaxAge=9999999999999999;",
            "userId=MockUserId; HttpOnly; Secure; SameSite=None; MaxAge=9999999999999999;"
        ];
        return new HttpResponse(body,
        {
            headers: {
                'Set-Cookie': responseCookies.join()
            },
            status: 201,
        });
    }),
    http.post(REACT_APP_SERVER_URI + `/users/logout`, ({ request, params, cookies }) => {
        let responseCookies: string[] = [
            "selector=; HttpOnly; Secure; SameSite=None; MaxAge=1;",
            "validator=; HttpOnly; Secure; SameSite=None; MaxAge=1;",
            "userId=; HttpOnly; Secure; SameSite=None; MaxAge=1;"
        ];

        return new HttpResponse(null,
        {
            headers: {
                'Set-Cookie': responseCookies.join()
            },
            status: 201,
        });
    }),
    http.post(REACT_APP_SERVER_URI + `/users/login/verify`, ({ request, params, cookies }) => {
        return new HttpResponse(null, {
            status: 401
        });
    }),
    http.post(REACT_APP_SERVER_URI + `/users/create`, ({}) => {
        let body = JSON.stringify({
            message: "Successfully authenticated user"
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
    http.post(REACT_APP_SERVER_URI + '/users/registration/verify', ({}) => {
        let body = JSON.stringify({
            message: "Successfully authenticated user"
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
    http.post(REACT_APP_SERVER_URI + '/users/registration/verify/new-token', ({}) => {
        return new HttpResponse(null, {
            status: 201
        });
    }),
    http.get(REACT_APP_SERVER_URI + `/users/:userId`, ({}) => {
        return HttpResponse.json({
            query: {
                businessName: "Handl"
            }
        });
    }),
    http.put(REACT_APP_SERVER_URI + `/users/:userId`, ({ request, params, cookies }) => {
        let body = JSON.stringify({
            message: "Successfully updated your info!"
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
    http.put(REACT_APP_SERVER_URI + `/users/:userId/password`, ({ request, params, cookies }) => {
        let body = JSON.stringify({
            message: "Successfully updated your password."
        });
        return new HttpResponse(body, {
            status: 201
        });
    }),
];