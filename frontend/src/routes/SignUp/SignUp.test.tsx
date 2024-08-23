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
    const user = userEvent.setup();
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

        await user.type(form.children[3], "Mock Business");
        await user.type(form.children[4], "Foo");
        await user.type(form.children[5], "Bar");
        await user.type(form.children[6], "1234567890");
        await user.type(form.children[7], "123456789");
        await user.type(form.children[8], "555 Foo st.");
        await user.type(form.children[9], "La La Land");
        await user.selectOptions(form.children[10], "CA");
        await user.type(form.children[11], "90210");
        await user.type(form.children[12], "fooPassw0rd!");

        await waitFor(() => {
            expect(screen.getByDisplayValue("Mock Business")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Foo")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Bar")).toBeInTheDocument();
            // Okay to ignore this for now since we're going to remove EIN in the future
            // expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
            expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
            expect(screen.getByDisplayValue("555 Foo st.")).toBeInTheDocument();
            expect(screen.getByDisplayValue("La La Land")).toBeInTheDocument();
            expect((form.children[10].children[5] as HTMLOptionElement).selected).toBeTruthy();
            expect(screen.getByDisplayValue("90210")).toBeInTheDocument();
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });

    it("Should have disabled registration button because business name field is empty", async function() {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        await user.type(form.children[2], "mockemail@foo.com");
        await user.type(form.children[4], "Foo");
        await user.type(form.children[5], "Bar");
        await user.type(form.children[6], "1234567890");
        await user.type(form.children[7], "123456789");
        await user.type(form.children[8], "555 Foo st.");
        await user.type(form.children[9], "La La Land");
        await user.selectOptions(form.children[10], "CA");
        await user.type(form.children[11], "90210");
        await user.type(form.children[12], "fooPassw0rd!");

        await waitFor(() => {
            expect(screen.getByDisplayValue("mockemail@foo.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Foo")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Bar")).toBeInTheDocument();
            // expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
            expect(screen.getByDisplayValue("123456789")).toBeInTheDocument();
            expect(screen.getByDisplayValue("555 Foo st.")).toBeInTheDocument();
            expect(screen.getByDisplayValue("La La Land")).toBeInTheDocument();
            expect((form.children[10].children[5] as HTMLOptionElement).selected).toBeTruthy();
            expect(screen.getByDisplayValue("90210")).toBeInTheDocument();
            expect(screen.getByDisplayValue("fooPassw0rd!")).toBeInTheDocument();
            expect(registrationButton).toBeDisabled();
        });
    });
    
    it("Should show confirmation message of successful account creation and verification email being sent", async function () {
        const { container } = render(<SignUp />);

        let form = screen.getByTestId("default-form");
        let registrationButton = screen.getByText("Register");

        await user.type(form.children[2], "mockemail@foo.com");
        await user.type(form.children[3], "Mock Business");
        await user.type(form.children[4], "Foo");
        await user.type(form.children[5], "Bar");
        await user.type(form.children[6], "1234567890");
        await user.type(form.children[7], "123456789");
        await user.type(form.children[8], "555 Foo st.");
        await user.type(form.children[9], "La La Land");
        await user.selectOptions(form.children[10], "CA");
        await user.type(form.children[11], "90210");
        await user.type(form.children[12], "fooPassw0rd!");   
        await user.click(registrationButton);

        await waitFor(() => {
            expect(screen.getByTestId("successful-registration")).toBeDefined();
            expect((screen.getByTestId("successful-registration").children[0]).innerHTML).toEqual("You've successfully signed up for Handl!");
            expect(screen.getByTestId("successful-registration")).toBeInTheDocument();
        });
    });

    it.skip("Should show error message because account already exists.", async function() {
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

    it.skip("Should show the password whenever show password icon is clicked", async function() {
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

    it.skip("Should show password is too short error message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        act(() => {
            userEvent.type(form.children[12], "foo");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("Password is too short")).toBeInTheDocument();
        }); 
    });

    it.skip("Should show password must contain a number message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        act(() => {
            userEvent.type(form.children[12], "foobaroni$#");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("Password must contain a number")).toBeInTheDocument();
        }); 
    });

    it.skip("Should show password must contain a lower case letter message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        act(() => {
            userEvent.type(form.children[12], "FOOBARONI$#%34");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("Password must contain a lowercase letter")).toBeInTheDocument();
        });
    });

    it.skip("Should show password must contain an uppercase letter message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        act(() => {
            userEvent.type(form.children[12], "foobaroni$34238$#$!");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("Password must contain an uppercase letter")).toBeInTheDocument();
        }); 
    });

    it.skip("Should show password must contain a special character message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        act(() => {
            userEvent.type(form.children[12], "FOobaroni434");
        });

        waitFor(() => {
            expect(screen.getByDisplayValue("Password must contain a special character from the following: ~ ` ! # $ % ^ & * € £ @ + = - [ ] ' ; , / { } ( ) | \" : < > ? . _")).toBeInTheDocument();
        }); 
    });
});