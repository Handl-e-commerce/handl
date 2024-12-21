import { describe, expect, it } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { ContactUs } from './ContactUs';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe("Contact Us Tests", function() {
    const user = userEvent.setup();
    it("Should render the submission confirmation upon clicking submit", async () => {
        const { container } = render(<ContactUs />);

        await user.type(screen.getByPlaceholderText("First Name"), "Foo");
        await user.type(screen.getByPlaceholderText("Last Name"), "Bar");
        await user.type(screen.getByPlaceholderText("Email"), "foo.bar@gmail.com");
        await user.type(screen.getByPlaceholderText("Message"), "Foo bar is very annoyed by you! This is no good man!");
        
        await waitFor(() => {
            expect(screen.getByDisplayValue("Foo")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Bar")).toBeInTheDocument();
            expect(screen.getByDisplayValue("foo.bar@gmail.com")).toBeInTheDocument();
            expect(screen.getByDisplayValue("Foo bar is very annoyed by you! This is no good man!")).toBeInTheDocument();
            expect(screen.getByText("Submit")).not.toBeDisabled;
        });
        
        await user.click(screen.getByText("Submit"));

        await waitFor(() => {
            expect(screen.getByText("Thanks for you message!")).toBeInTheDocument();
            expect(screen.getByText("We'll respond to you soon!")).toBeInTheDocument();
        });


    });

    it("Should have a disabled submit button by default", async () => {
        const { container } = render(<ContactUs />);

        expect(screen.getByText("Submit")).toBeDisabled;
    });
})