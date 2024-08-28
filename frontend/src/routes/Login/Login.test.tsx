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
    const user = userEvent.setup();
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
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let passwordInput = screen.getByPlaceholderText("Password");
        
        await user.type(passwordInput, "mockPassword");
        
        await waitFor(() => {
            expect(screen.queryAllByDisplayValue("mockEmail@email.com").length).toEqual(0);
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
            expect(loginButton).toBeDisabled();
        });
    });
    
    it("Should have a disabled button because password input field is empty", async () => {
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        
        await user.type(emailInput, "mockEmail@email.com");
        
        await waitFor(() => {
            expect(screen.queryAllByDisplayValue("mockPassword").length).toEqual(0);
            expect(screen.getByDisplayValue("mockEmail@email.com")).toBeInTheDocument();
            expect(loginButton).toBeDisabled();
        });
    });

    it("Should redirect to homepage because login returned 201", async () => {
        document.cookie = "loggedIn=true;";
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        let passwordInput = screen.getByPlaceholderText("Password");
        
        await user.type(emailInput, "mockEmail@email.com");
        await user.type(passwordInput, "mockPassword");
        
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

    it("Should display an error message because login returned 401", async () => {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/login`, ({ request, params, cookies }) => {
                return new HttpResponse(null, { status: 401,});
            })
        );
        const { container } = render(<Login />);
        
        let loginButton = screen.getByRole("login-button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        let passwordInput = screen.getByPlaceholderText("Password");
        
        await user.type(emailInput, "mockEmail@email.com");
        await user.type(passwordInput, "mockPassword");
        
        await waitFor(() => {
            expect(screen.getByDisplayValue("mockEmail@email.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
            expect(loginButton).toBeEnabled();
        });
        act(() => {
            userEvent.click(loginButton);
        });
        await waitFor(() => {
            expect(screen.getByText("The email or password you entered was incorrect")).toBeInTheDocument();
        });
    });

    it("Should set the password input type to text after clicking the show password checkbox", async () => {
        const { container } = render(<Login />);
        
        let passwordInput = screen.getByPlaceholderText("Password");
        let checkbox = screen.getByTestId("show-password-switch");
        
        await user.type(passwordInput, "mockPassword");
        
        await waitFor(() => {
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
        });
        
        await user.click(checkbox);
        
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Password").getAttribute("type")).toEqual("text");
        });
    });

    it("Should show the password reset form upon clicking forgot password and then show confirmation after clicking reset request button", async () => {
        const { container } = render(<Login />);
        let forgotPasswordButton = screen.getByText("Forgot password?")
        
        await user.click(forgotPasswordButton);
        
        await waitFor(() => {
            expect(screen.getByText("Enter the email associated with your account")).toBeInTheDocument();
        });
        let resetRequestButton = await waitFor(() => screen.getByText("Request Password Reset"));
        
        await user.type(screen.getByRole("reset-password-email-input").querySelector('input') as HTMLInputElement, "foo@bar.com");
        await user.click(resetRequestButton);
        
        await waitFor(() => {
            expect(screen.getByText(("We've sent a password reset link to your email."))).toBeInTheDocument();
        });
    });
});