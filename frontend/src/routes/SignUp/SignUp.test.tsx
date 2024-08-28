import { describe, expect, it } from '@jest/globals';
import { SignUp } from './SignUp';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
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

        expect(form).toBeDefined();
        expect(form.childNodes.length).toEqual(14);
        expect(screen.getByTestId("registration-button")).toBeDisabled();
    });

    it("Should have disabled registration button because email field is empty", async function() {
        const { container } = render(<SignUp />);

        let registrationButton = screen.getByText("Register");

        await user.type(screen.getByTestId("business-name-input").querySelector('input') as HTMLInputElement, "Mock Business");
        await user.type(screen.getByTestId("first-name-input").querySelector('input') as HTMLInputElement, "Foo");
        await user.type(screen.getByTestId("last-name-input").querySelector('input') as HTMLInputElement, "Bar");
        await user.type(screen.getByTestId("phone-number-input").querySelector('input') as HTMLInputElement, "1234567890");
        await user.type(screen.getByTestId("address-input").querySelector('input') as HTMLInputElement, "555 Foo st.");
        await user.type(screen.getByTestId("city-input").querySelector('input') as HTMLInputElement, "La La Land");
        await user.click(screen.getByTestId("state-selector"));
        fireEvent.change(screen.getByTestId("zipcode-input").querySelector('input') as HTMLInputElement, { target: { value: "90210"}})
        fireEvent.change(screen.getByTestId("password-input").querySelector('input') as HTMLInputElement, { target: { value: "fooPassw0rd!"}})

        let checkboxItems = await waitFor(async () => await screen.findAllByTestId("menu-item"), {
            timeout: 3000,
        });

        await user.click(checkboxItems[5]);

        await waitFor(() => {
            expect(screen.getByTestId("business-name-input").querySelector('input')?.value).toBe("Mock Business");
            expect(screen.getByTestId("first-name-input").querySelector('input')?.value).toBe("Foo");
            expect(screen.getByTestId("last-name-input").querySelector('input')?.value).toBe("Bar");
            expect(screen.getByTestId("phone-number-input").querySelector('input')?.value).toBe("(123)-456-7890");
            expect(screen.getByTestId("address-input").querySelector('input')?.value).toBe("555 Foo st.");
            expect(screen.getByTestId("city-input").querySelector('input')?.value).toBe("La La Land");
            expect(screen.getByText(/CA/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue("90210")).toBeInTheDocument();
            expect(screen.getByTestId("password-input").querySelector('input')?.value).toBe("fooPassw0rd!");
            expect(registrationButton).toBeDisabled();
        });
    });

    it("Should have disabled registration button because business name field is empty", async function() {
        const { container } = render(<SignUp />);

        let registrationButton = screen.getByText("Register");

        await user.type(screen.getByTestId("email-input").querySelector('input') as HTMLInputElement, "mockemail@foo.com");
        await user.type(screen.getByTestId("first-name-input").querySelector('input') as HTMLInputElement, "Foo");
        await user.type(screen.getByTestId("last-name-input").querySelector('input') as HTMLInputElement, "Bar");
        await user.type(screen.getByTestId("phone-number-input").querySelector('input') as HTMLInputElement, "1234567890");
        await user.type(screen.getByTestId("address-input").querySelector('input') as HTMLInputElement, "555 Foo st.");
        await user.type(screen.getByTestId("city-input").querySelector('input') as HTMLInputElement, "La La Land");
        await user.click(screen.getByTestId("state-selector"));
        fireEvent.change(screen.getByTestId("zipcode-input").querySelector('input') as HTMLInputElement, { target: { value: "90210"}})
        fireEvent.change(screen.getByTestId("password-input").querySelector('input') as HTMLInputElement, { target: { value: "fooPassw0rd!"}})

        let checkboxItems = await waitFor(async () => await screen.findAllByTestId("menu-item"), {
            timeout: 3000,
        });

        await user.click(checkboxItems[5]);

        await waitFor(() => {
            expect(screen.getByTestId("email-input").querySelector('input')?.value).toBe("mockemail@foo.com");
            expect(screen.getByTestId("first-name-input").querySelector('input')?.value).toBe("Foo");
            expect(screen.getByTestId("last-name-input").querySelector('input')?.value).toBe("Bar");
            expect(screen.getByTestId("phone-number-input").querySelector('input')?.value).toBe("(123)-456-7890");
            expect(screen.getByTestId("address-input").querySelector('input')?.value).toBe("555 Foo st.");
            expect(screen.getByTestId("city-input").querySelector('input')?.value).toBe("La La Land");
            expect(screen.getByText(/CA/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue("90210")).toBeInTheDocument();
            expect(screen.getByTestId("password-input").querySelector('input')?.value).toBe("fooPassw0rd!");
            expect(registrationButton).toBeDisabled();
        });
    });
    
    it("Should show confirmation message of successful account creation and verification email being sent", async function () {
        const { container } = render(<SignUp />);

        let registrationButton = screen.getByText("Register");

        await user.type(screen.getByTestId("email-input").querySelector('input') as HTMLInputElement, "mockemail@foo.com");
        await user.type(screen.getByTestId("business-name-input").querySelector('input') as HTMLInputElement, "Mock Business");
        await user.type(screen.getByTestId("first-name-input").querySelector('input') as HTMLInputElement, "Foo");
        await user.type(screen.getByTestId("last-name-input").querySelector('input') as HTMLInputElement, "Bar");
        await user.type(screen.getByTestId("phone-number-input").querySelector('input') as HTMLInputElement, "1234567890");
        await user.type(screen.getByTestId("address-input").querySelector('input') as HTMLInputElement, "555 Foo st.");
        await user.type(screen.getByTestId("city-input").querySelector('input') as HTMLInputElement, "La La Land");
        await user.click(screen.getByTestId("state-selector"));
        fireEvent.change(screen.getByTestId("zipcode-input").querySelector('input') as HTMLInputElement, { target: { value: "90210"}})
        fireEvent.change(screen.getByTestId("password-input").querySelector('input') as HTMLInputElement, { target: { value: "fooPassw0rd!"}})

        let checkboxItems = await waitFor(async () => await screen.findAllByTestId("menu-item"), {
            timeout: 3000,
        });

        await user.click(checkboxItems[5]);
        
        await user.click(registrationButton);

        await waitFor(() => {
            expect(screen.getByTestId("successful-registration")).toBeDefined();
            expect((screen.getByTestId("successful-registration").children[0]).innerHTML).toEqual("You've successfully signed up for Handl!");
            expect(screen.getByTestId("successful-registration")).toBeInTheDocument();
        });
    });

    it("Should show error message because account already exists.", async function() {
        server.use(
            http.post(REACT_APP_SERVER_URI + `/users/register`, ({ request, params, cookies }) => {
                return new HttpResponse(null, { status: 401,});
            })
        );

        const { container } = render(<SignUp />);

        await user.type(screen.getByTestId("email-input").querySelector('input') as HTMLInputElement, "mockemail@foo.com");
        await user.type(screen.getByTestId("business-name-input").querySelector('input') as HTMLInputElement, "Mock Business");
        await user.type(screen.getByTestId("first-name-input").querySelector('input') as HTMLInputElement, "Foo");
        await user.type(screen.getByTestId("last-name-input").querySelector('input') as HTMLInputElement, "Bar");
        await user.type(screen.getByTestId("phone-number-input").querySelector('input') as HTMLInputElement, "1234567890");
        await user.type(screen.getByTestId("address-input").querySelector('input') as HTMLInputElement, "555 Foo st.");
        await user.type(screen.getByTestId("city-input").querySelector('input') as HTMLInputElement, "La La Land");
        await user.click(screen.getByTestId("state-selector"));
        fireEvent.change(screen.getByTestId("zipcode-input").querySelector('input') as HTMLInputElement, { target: { value: "90210"}})
        fireEvent.change(screen.getByTestId("password-input").querySelector('input') as HTMLInputElement, { target: { value: "fooPassw0rd!"}})

        let checkboxItems = await waitFor(async () => await screen.findAllByTestId("menu-item"), {
            timeout: 3000,
        });

        await user.click(checkboxItems[5]);
        
        await user.click(screen.getByTestId("registration-button"));

        await waitFor(() => {
            expect(screen.getByTestId("sign-up-error")).toBeInTheDocument();
            expect(screen.getByTestId("sign-up-error").innerHTML).toEqual("User already exists.");
        });
    });

    it.skip("Should show the password whenever show password icon is clicked", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");
        let showPasswordIcon = form.children[12];

        await user.click(showPasswordIcon);
        
        await waitFor(() => {
            expect(screen.getByTestId("password-input")).toHaveAttribute("type", "text");
        });
    });

    it.skip("Should show password is too short error message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        await user.type(screen.getByTestId("password-input"), "foo");
        
        waitFor(() => {
            expect(screen.getByTestId("invalid-password-message").innerHTML).toEqual("Password is too short");
        }); 
    });

    it.skip("Should show password must contain a number message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        await user.type(screen.getByTestId("password-input"), "foobaroni$#");
        
        await waitFor(() => {
            expect(screen.getByTestId("invalid-password-message").innerHTML).toEqual("Password must contain a number");
        }); 
    });

    it.skip("Should show password must contain a lower case letter message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        await user.type(screen.getByTestId("password-input"), "FOOBARONI$#%34");
        
        await waitFor(() => {
            expect(screen.getByTestId("invalid-password-message").innerHTML).toEqual("Password must contain a lowercase letter");
        });
    });

    it.skip("Should show password must contain an uppercase letter message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        await user.type(screen.getByTestId("password-input"), "foobaroni$34238$#$!");
        
        await waitFor(() => {
            expect(screen.getByTestId("invalid-password-message").innerHTML).toEqual("Password must contain an uppercase letter");
        }); 
    });

    it.skip("Should show password must contain a special character message", async function() {
        const { container } = render(<SignUp />);
        let form = screen.getByTestId("default-form");

        await user.type(screen.getByTestId("password-input"), "FOobaroni434");
        
        await waitFor(() => {
            expect(screen.getByTestId("invalid-password-message").innerHTML).toEqual("Password must contain a special character from the following: ~ ` ! # $ % ^ &amp; * € £ @ + = - [ ] ' ; , / { } ( ) | \" : &lt; &gt; ? . _");
        }); 
    });
});