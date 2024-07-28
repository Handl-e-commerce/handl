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

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

afterEach(() => {
    deleteCookie("userId");
    deleteCookie("loggedIn");
});

describe("Login Route Test", function() {
    it("Should have a disabled button because both input fields are empty", async () => {
        const { container } = render(<Login />);
        
        waitFor(() => {
            let loginButton = screen.getByRole("button");
            expect(screen.queryAllByDisplayValue("mockEmail@email.com").length).toEqual(0);
            expect(screen.queryAllByDisplayValue("mockPassword").length).toEqual(0);
            expect(loginButton).toBeDisabled();
        });
    });

    it("Should have a disabled button because email input field is empty", async () => {
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let passwordInput = screen.getByPlaceholderText("Password");
        act(() => {
            userEvent.type(passwordInput, "mockPassword");
        });
        waitFor(() => {
            expect(screen.getByDisplayValue("mockEmail@email.com")).not.toBeInTheDocument();
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
            expect(loginButton).toBeDisabled();
        });
    });
    
    it("Should have a disabled button because password input field is empty", async () => {
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        act(() => {
            userEvent.type(emailInput, "mockEmail@email.com");
        });
        waitFor(() => {
            expect(screen.getByDisplayValue("mockEmail@email.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("mockPassword")).not.toBeInTheDocument();
            expect(loginButton).toBeDisabled();
        });
    });

    it("Should redirect to homepage because login returned 201", async () => {
        const { container } = render(<Login />);

        let loginButton = screen.getByRole("login-button");
        let emailInput = screen.getByPlaceholderText("Business Email");
        let passwordInput = screen.getByPlaceholderText("Password");
        act(() => {
            userEvent.type(emailInput, "mockEmail@email.com");
            userEvent.type(passwordInput, "mockPassword");
        });
        waitFor(() => {
            expect(screen.getByDisplayValue("mockEmail@email.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
            expect(loginButton).toBeEnabled();
        });
        act(() => {
            userEvent.click(loginButton);
        });
        waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1);
        });
    });

    it("Should display an error message because login returned 401", async () => {
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
        waitFor(() => {
            expect(screen.getByDisplayValue("mockEmail@email.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
            expect(loginButton).toBeEnabled();
        });
        act(() => {
            userEvent.click(loginButton);
        });
        waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(0);
            expect(screen.getByDisplayValue("The email or password you entered was incorrect")).toBeInTheDocument();
        });
    });

    it("Should set the password input type to text after clicking the show password checkbox", async () => {
        const { container } = render(<Login />);

        let passwordInput = screen.getByPlaceholderText("Password");
        let checkbox = screen.getByTestId("show-password-switch");
        act(() => {
            userEvent.type(passwordInput, "mockPassword");
        });
        waitFor(() => {
            expect(screen.getByDisplayValue("mockPassword")).toBeInTheDocument();
        });
        act(() => {
            userEvent.click(checkbox);
        });
        waitFor(() => {
            expect(passwordInput.inputMode).toEqual("text");
        });
    });

    it("Should show the password reset form upon clicking forgot password and then confirm request was sent to backend after clicking reset request button", async () => {
        const { container } = render(<Login />);
        let forgotPasswordButton = screen.getByText("Forgot password?")
        act(() => {
            userEvent.click(forgotPasswordButton);
        });
        waitFor(() => {
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