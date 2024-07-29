import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor } from '@testing-library/react';
import { ContactUs } from './ContactUs';
import userEvent from '@testing-library/user-event';

describe("Contact Us Tests", function() {
    it("Should render the submission confirmation upon clicking submit", async () => {
        const { container } = render(<ContactUs />);

        act(() => {
            userEvent.type(screen.getByPlaceholderText("First Name"), "Foo");
            userEvent.type(screen.getByPlaceholderText("Last Name"), "Bar");
            userEvent.type(screen.getByPlaceholderText("Email"), "foo.bar@gmail.com");
            userEvent.type(screen.getByPlaceholderText("Message"), "Foo bar is very annoyed by you! This is no good man!");
            expect(screen.getByText("Submit")).not.toBeDisabled;
            userEvent.click(screen.getByText("Submit"));
        });

        waitFor(() => {
            expect("Thanks for you message! We'll respond to you soon!").toBeInTheDocument();
        });


    });

    it("Should have a disabled submit button by default", async () => {
        const { container } = render(<ContactUs />);

        expect(screen.getByText("Submit")).toBeDisabled;
    });
})