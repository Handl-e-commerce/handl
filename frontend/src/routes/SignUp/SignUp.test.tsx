import { describe, expect, it } from '@jest/globals';
import { SignUp } from './SignUp';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { server } from "../../../__mocks__/server";
import { http, HttpResponse } from 'msw';

const envVariables = process.env;
const {
    REACT_APP_SERVER_URI,
} = envVariables;

describe("Sign Up Route Test", function() {
    it("Register button should be disabled by default", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        expect(form).toBeDefined();
        expect(form.childNodes.length).toEqual(14);
        expect(registrationButton).toBeDisabled();
    });

    it("Should have disabled button because passwords don't match", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");
        expect(form).toBeDefined();
        expect(form.childNodes.length).toEqual(14);

        act(() => {
            userEvent.type(form.children[1], "mockemail@foo.com");
            userEvent.type(form.children[2], "Mock Business");
            userEvent.type(form.children[3], "012-345-6789");
            userEvent.type(form.children[4], "fooPassw0rd!");
            userEvent.type(form.children[5], "peperoniSandwhich");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("mockemail@foo.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Mock Business")).toBeInTheDocument();
            expect(screen.getByDisplayValue("012-345-6789")).toBeInTheDocument();
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(screen.getByDisplayValue("peperoniSandwhich")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });

    it("Should have disabled button because email field is empty", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[2], "Mock Business");
            userEvent.type(form.children[3], "012-345-6789");
            userEvent.type(form.children[4], "fooPassw0rd!");
            userEvent.type(form.children[5], "fooPassw0rd!");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("Mock Business")).toBeInTheDocument();
            expect(screen.getByDisplayValue("012-345-6789")).toBeInTheDocument();
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });

    it("Should have disabled button because business name field is empty", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[1], "mockemail@foo.com");
            userEvent.type(form.children[3], "012-345-6789");
            userEvent.type(form.children[4], "fooPassw0rd!");
            userEvent.type(form.children[5], "fooPassw0rd!");        
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("mockemail@foo.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("012-345-6789")).toBeInTheDocument();
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });

    it("Should have disabled button because phone number field is empty", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[1], "mockemail@foo.com");
            userEvent.type(form.children[2], "Mock Business");
            userEvent.type(form.children[4], "fooPassw0rd!");
            userEvent.type(form.children[5], "fooPassw0rd!");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("mockemail@foo.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Mock Business")).toBeInTheDocument()
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });
    
    it("Should show confirmation message of successful account creation and verification email being sent", async function () {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[0], "mockemail@foo.com");
            userEvent.type(form.children[1], "Mock Business");
            userEvent.type(form.children[2], "012-345-6789");
            userEvent.type(form.children[3], "fooPassw0rd!");
            userEvent.type(form.children[4], "fooPassw0rd!");
            userEvent.click(registrationButton);
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("You've successfully signed up for Handl!")).toBeInTheDocument();
            expect(screen.getByTestId("successful-registration")).toBeDefined();
            expect(screen.getByTestId("successful-registration")).toBeInTheDocument();
        });
    });

    it("Should show error message because account already exists.", async function() {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/create`, ({ request, params, cookies }) => {
                return new HttpResponse(null, { status: 401,});
            })
        );

        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[0], "mockemail@foo.com");
            userEvent.type(form.children[1], "Mock Business");
            userEvent.type(form.children[2], "012-345-6789");
            userEvent.type(form.children[3], "fooPassw0rd!");
            userEvent.type(form.children[4], "fooPassw0rd!");
            userEvent.click(registrationButton);
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("mockemail@foo.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Mock Business")).toBeInTheDocument()
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(screen.getByDisplayValue("User already exists.")).toBeInTheDocument();
            expect(registrationButton).toBeEnabled();
            expect(form.children.length).toEqual(8);
        });
    });
});