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
        expect(form.childNodes.length).toEqual(15);
        expect(registrationButton).toBeDisabled();
    });

    it("Should have disabled registration button because email field is empty", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[3], "Mock Business");
            userEvent.type(form.children[4], "Foo");
            userEvent.type(form.children[5], "Bar");
            userEvent.type(form.children[6], "1234567890");
            userEvent.type(form.children[7], "123456789");
            userEvent.type(form.children[8], "555 Foo st.");
            userEvent.type(form.children[9], "La La Land");
            userEvent.type(form.children[10], "CA");
            userEvent.type(form.children[11], "90210");
            userEvent.type(form.children[12], "fooPassw0rd!");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("Mock Business")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Foo")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Bar")).toBeInTheDocument();
            expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
            expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
            expect(screen.getByDisplayValue("555 Foo st.")).toBeInTheDocument();
            expect(screen.getByDisplayValue("La La Land")).toBeInTheDocument();
            expect(screen.getByDisplayValue("CA")).toBeInTheDocument();
            expect(screen.getByDisplayValue("90210")).toBeInTheDocument();
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });

    it("Should have disabled registration button because business name field is empty", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[2], "mockemail@foo.com");
            userEvent.type(form.children[4], "Foo");
            userEvent.type(form.children[5], "Bar");
            userEvent.type(form.children[6], "1234567890");
            userEvent.type(form.children[7], "123456789");
            userEvent.type(form.children[8], "555 Foo st.");
            userEvent.type(form.children[9], "La La Land");
            userEvent.type(form.children[10], "CA");
            userEvent.type(form.children[11], "90210");
            userEvent.type(form.children[12], "fooPassw0rd!");     
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("mockemail@foo.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Foo")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Bar")).toBeInTheDocument();
            expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
            expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
            expect(screen.getByDisplayValue("555 Foo st.")).toBeInTheDocument();
            expect(screen.getByDisplayValue("La La Land")).toBeInTheDocument();
            expect(screen.getByDisplayValue("CA")).toBeInTheDocument();
            expect(screen.getByDisplayValue("90210")).toBeInTheDocument();
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });
    
    it("Should show confirmation message of successful account creation and verification email being sent", async function () {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        act(() => {
            userEvent.type(form.children[2], "mockemail@foo.com");
            userEvent.type(form.children[3], "Mock Business");
            userEvent.type(form.children[4], "Foo");
            userEvent.type(form.children[5], "Bar");
            userEvent.type(form.children[6], "1234567890");
            userEvent.type(form.children[7], "123456789");
            userEvent.type(form.children[8], "555 Foo st.");
            userEvent.type(form.children[9], "La La Land");
            userEvent.type(form.children[10], "CA");
            userEvent.type(form.children[11], "90210");
            userEvent.type(form.children[12], "fooPassw0rd!");   
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

    it("Should show the password whenever show password icon is clicked", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");
        let showPasswordIcon = form.children[13];

        act(() => {
            userEvent.click(showPasswordIcon);
        });

        waitFor(() => {
            expect(form.children[12]).toHaveAttribute("type", "text");
        });
    });
});