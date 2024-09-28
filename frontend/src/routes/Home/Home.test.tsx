import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import '@testing-library/jest-dom/extend-expect';

describe("Home Route Test", () => {
    it("Container links should all contain an href allowing them to redirect to results page with category param in query", async () => {
        const { container } = render(<Home />);
        let mostViewedCategories = screen.getByTestId("most-viewed-categories-container");
        // We start from 1 because the very first child is just a div element without any anchors and is a header
        for (let i = 1; i < mostViewedCategories.children.length; i++) {
            expect(mostViewedCategories.children[i].children[0]).toHaveAttribute("href", expect.stringContaining(window.location.origin + "/results?categories="));
        }
        let featuredCategories = screen.getByTestId("featured-categories-container");
        for (let i = 1; i < featuredCategories.children.length; i++) {
            expect(featuredCategories.children[i].children[0]).toHaveAttribute("href", expect.stringContaining(window.location.origin + "/results?categories="));
        }
    });

    it("Should render only 8 categories in total with 2 being the titles", async () => {
        const { container } = render(<Home />);
        let mostViewedCategories = screen.getByTestId("most-viewed-categories-container");
        let featuredCategories = screen.getByTestId("featured-categories-container");
        expect(mostViewedCategories.childElementCount).toEqual(5);
        expect(featuredCategories.childElementCount).toEqual(5);
    });
});