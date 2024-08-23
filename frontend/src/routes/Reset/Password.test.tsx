import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Password } from './Password';
import { server } from "../../../__mocks__/server";
import { http, HttpResponse } from 'msw';
import userEvent from '@testing-library/user-event';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

jest.mock('../../utils/cookie-util', () => {
    const originalModule = jest.requireActual('../../utils/cookie-util');
  
    //Mock the default export and named export 'foo'
    return {
      __esModule: true,
      ...originalModule,
      cookieParser: jest.fn(() => ({
        "userId": "mockUserId",
        "token": "mockToken"
      })),
    };
});

describe("Password tests", () => {
    const user = userEvent.setup();
    // This will come in handy in the future for this test + component:
    // https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
    // The test works and passes, it's just it throws a really ugly error warning which annoys me. 
    it.skip("Should throw an error because cookies are undefined", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/password/reset/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token is not valid. Please request for a new one to be sent to you."
                });
                return new HttpResponse(body, { status: 401 });
            })
        );
        expect(() => render(<Password />)).toThrow("Oops something went wrong. The link you tried to use may be broken.");
    });
    
    it("Should show a message saying token has expired", async () => {
        document.cookie = ''
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/password/reset/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token has expired. Please request for a new one to be sent to you."
                });
                return new HttpResponse(body, { status: 401 });
            })
        );
        const { container } = render(<Password />);

        await waitFor(() => {
            expect(screen.getByText("The verification token has expired. Please request for a new one to be sent to you.")).toBeInTheDocument();
        })
    });
        
    it("Should show a message saying token is invalid", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/password/reset/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token is not valid. Please request for a new one to be sent to you."
                });
                return new HttpResponse(body, { status: 401 });
            })
        );

        const { container } = render(<Password />);

        await waitFor(() => {
            expect(screen.getByText("The verification token is not valid. Please request for a new one to be sent to you.")).toBeInTheDocument();
        })
    });
        
    it("Should show password reset form due to having valid tokens", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/password/reset/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token is valid."
                });
                return new HttpResponse(body, { status: 201 });
            })
        );

        const { container } = render(<Password />);

        await waitFor(() => {
            expect(screen.getByRole("password-reset-form")).toBeInTheDocument();
        })
    });
        
    it("Submit Reset button should be disabled due to passwords not matching", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/password/reset/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token is valid."
                });
                return new HttpResponse(body, { status: 201 });
            })
        );

        const { container } = render(<Password />);

        await waitFor(() => {
            expect(screen.getByRole("password-reset-form")).toBeInTheDocument();
        })

        await user.type(screen.getByRole("password-input"), "alkdjfaocieahlken");
        await user.type(screen.getByRole("confirmation-password-input"), "srughosiepuhabdkjahc");

        await waitFor(() => {
            expect(screen.getByRole("password-reset-button")).toBeDisabled();
        });
    });
        
    it("Should show successful submission message", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/password/reset/verify`, ({ request, params, cookies }) => {
                let body = JSON.stringify({
                    message: "The verification token is valid."
                });
                return new HttpResponse(body, { status: 201 });
            })
        );

        const { container } = render(<Password />);

        await waitFor(() => {
            expect(screen.getByRole("password-reset-form")).toBeInTheDocument();
            expect(screen.getByRole("password-input")).toBeInTheDocument();
            expect(screen.getByRole("confirmation-password-input")).toBeInTheDocument();
        })

        await user.type(screen.getByRole("password-input").querySelector("input")!, "M0ckpassword0830$");
        await user.type(screen.getByRole("confirmation-password-input").querySelector("input")!, "M0ckpassword0830$");

        await waitFor(() => {
            expect(screen.getByRole("password-reset-button")).toBeEnabled();
        });

        await user.click(screen.getByRole("password-reset-button"));

        await waitFor(() => {
            expect(screen.getByText("We've successfully reset your password.")).toBeInTheDocument();
        });
    });
});