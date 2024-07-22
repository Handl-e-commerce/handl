import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import '@testing-library/jest-dom/extend-expect';

describe("Footer Tests", () => {
    it("Container links should all contain an href allowing them to redirect to results page with category param in query", async () => {
        const { container } = render(<Footer />);
        expect(screen.getByText("About Us")).toHaveAttribute("href", expect.stringMatching(window.location.origin + "/about-us"));
        expect(screen.getByText("Contact Us")).toHaveAttribute("href", expect.stringMatching(window.location.origin + "/contact-us"));
    });
});