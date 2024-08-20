import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import { Login } from './Login';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { server } from "../../../__mocks__/server";
import { http, HttpResponse } from 'msw';
import { deleteCookie } from '../../utils/cookie-util';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

let replaceMock = jest.fn();
Object.defineProperty(window, 'location', {
    value: {
        hash: {
        endsWith: replaceMock,
        includes: replaceMock,
        },
        replace: replaceMock,
    },
    writable: true,
    }
);

jest.mock('../../utils/cookie-util', () => {
    const originalModule = jest.requireActual('../../utils/cookie-util');
  
    //Mock the default export and named export 'foo'
    return {
      __esModule: true,
      ...originalModule,
      cookieParser: jest.fn(() => ({
        "loggedIn": "true"
      }))
    };
});


beforeEach(() => {
    document.cookie = "loggedIn=;";
});

afterEach(() => {
    deleteCookie("userId");
    deleteCookie("loggedIn");
});

describe("Login Route Test", function() {
    it("Should have a disabled button because both input fields are empty", async () => {
        const { container } = render(<Login />);
        
        await waitFor(() => {
            let loginButton = screen.getByRole("login-button");
            expect(screen.queryAllByDisplayValue("mockEmail@email.com").length).toEqual(0);
            expect(screen.queryAllByDisplayValue("mockPassword").length).toEqual(0);
            expect(loginButton).toBeDisabled();
        });
    });

    it("Should have a disabled button because email input field is empty", async () => {
        const user = userEvent.setup()
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let passwordInput = screen.getByPlaceholderText("Password");
        await act(async () => {
            await user.type(passwordInput, "mockPassword");
        });
        await waitFor(() => {
            expect(screen.queryAllByDisplayValue("mockEmail@email.com").length).toEqual(0);
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
            expect(loginButton).toBeDisabled();
        });
    });
    
    it("Should have a disabled button because password input field is empty", async () => {
        const user = userEvent.setup()
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        await act(async () => {
            await user.type(emailInput, "mockEmail@email.com");
        });
        await waitFor(() => {
            expect(screen.queryAllByDisplayValue("mockPassword").length).toEqual(0);
            expect(screen.getByDisplayValue("mockEmail@email.com")).toBeInTheDocument();
            expect(loginButton).toBeDisabled();
        });
    });

    it("Should redirect to homepage because login returned 201", async () => {
        const user = userEvent.setup()
        document.cookie = "loggedIn=true;";
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        let passwordInput = screen.getByPlaceholderText("Password");
        await act(async () => {
            await user.type(emailInput, "mockEmail@email.com");
            await user.type(passwordInput, "mockPassword");
        });
        await waitFor(() => {
            expect(screen.getByDisplayValue("mockEmail@email.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
            expect(loginButton).toBeEnabled();
        });
        
        user.click(loginButton);

        await waitFor(() => {
            expect(replaceMock).toHaveBeenCalledTimes(1);
        });
    });

    // TODO: (HIGH) Fix these last 3 unit tests when I get back
    it.skip("Should display an error message because login returned 401", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/login`, ({ request, params, cookies }) => {
                return new HttpResponse(null, { status: 401,});
            })
        );
        
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        let passwordInput = screen.getByPlaceholderText("Password");
        act(() => {
            userEvent.type(emailInput, "mockEmail@email.com");
            userEvent.type(passwordInput, "mockPassword");
        });
        await waitFor(() => {
            expect(emailInput.innerText).toEqual("mockEmail@email.com");
            expect(passwordInput.innerText).toEqual("mockPassword");
            expect(loginButton).toBeEnabled();
        });
        act(() => {
            userEvent.click(loginButton);
        });
        await waitFor(() => {
            expect(screen.getByText("The email or password you entered was incorrect")).toBeInTheDocument();
        });
    });

    it.skip("Should set the password input type to text after clicking the show password checkbox", async () => {
        const { container } = render(<Login />);

        let passwordInput = screen.getByPlaceholderText("Password");
        let checkbox = screen.getByTestId("show-password-switch");
        act(() => {
            userEvent.type(passwordInput, "mockPassword");
        });
        await waitFor(() => {
            expect(screen.getByText("mockPassword")).toBeInTheDocument();
        });
        act(() => {
            userEvent.click(checkbox);
        });
        await waitFor(() => {
            expect(passwordInput.inputMode).toEqual("text");
        });
    });

    it.skip("Should show the password reset form upon clicking forgot password and then confirm request was sent to backend after clicking reset request button", async () => {
        const { container } = render(<Login />);
        let forgotPasswordButton = screen.getByText("Forgot password?")
        act(() => {
            userEvent.click(forgotPasswordButton);
        });
        await waitFor(() => {
            expect("Enter the email associated with your account").toBeInTheDocument();
            let resetRequestButton = screen.getByText("Request Password Reset");
            act(() => {
                userEvent.click(resetRequestButton);
            }); 
            waitFor(() => {
                expect("We've sent a password reset link to your email.").toBeInTheDocument();
            });
        });
    });
});