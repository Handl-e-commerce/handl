import { describe, expect, it } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { Verify } from './Verify';
import '@testing-library/jest-dom/extend-expect';
import { server } from "../../../__mocks__/server";
import { http, HttpResponse } from 'msw';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

describe("Verify Route Test", function() {
    it("Should show confirmation response message", async function() {
        const { container } = render(<Verify />);

        let verifyContainer = screen.getByTestId("verify-container");
        waitFor(() => {
            expect(verifyContainer.childElementCount).toEqual(1);
            expect(screen.getByText("Successfully verified email.")).toBeInTheDocument();
        });
    });
    
    it("Should show user is already validated message", async function() {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/registration/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "Your email is already verified."
                })
                return new HttpResponse(body, { status: 201,});
            })
        );
        const { container } = render(<Verify />);

        let verifyContainer = screen.getByTestId("verify-container");
        waitFor(() => {
            expect(verifyContainer.childElementCount).toEqual(1);
            expect(screen.getByText("Your email is already verified.")).toBeInTheDocument();
        });
    });

    it("Should show token expiration response message with request new token div", async function() {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/registration/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token has expired. Please request for a new one to be sent to you."
                })
                return new HttpResponse(body, { status: 401,});
            })
        );
        const { container } = render(<Verify />);
        let verifyContainer = screen.getByTestId("verify-container");
        waitFor(() => {
            expect(verifyContainer.childElementCount).toEqual(2);
            expect(screen.getByText("The verification token has expired. Please request for a new one to be sent to you.")).toBeInTheDocument();
            expect(screen.getByText("resend verification link")).toBeInTheDocument();
        });
    });

    it("Should show invalid token response message with request new token div", async function() {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/registration/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token is not valid. Please request for a new one to be sent to you."
                })
                return new HttpResponse(body, { status: 401,});
            })
        );
        const { container } = render(<Verify />);
        let verifyContainer = screen.getByTestId("verify-container");
        waitFor(() => {
            expect(verifyContainer.childElementCount).toEqual(2);
            expect(screen.getByText("The verification token is not valid. Please request for a new one to be sent to you.")).toBeInTheDocument();
            expect(screen.getByText("resend verification link")).toBeInTheDocument();
        });
    });
});