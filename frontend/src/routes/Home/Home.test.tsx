import { describe, expect, it } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { Home } from './Home';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

describe("Home Route Test", () => {
    it("Container links should all contain an href allowing them to redirect to results page with category param in query", async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        let mostViewedCategories = screen.getByTestId("Most Viewed Categories-container");
        // We start from 1 because the very first child is just a div element without any anchors and is a header
        for (let i = 1; i < mostViewedCategories.children.length; i++) {
            expect(mostViewedCategories.children[i].children[0]).toHaveAttribute("href", expect.stringContaining(window.location.origin + `/results/`));
        }
        let featuredCategories = screen.getByTestId("Featured Categories-container");
        for (let i = 1; i < featuredCategories.children.length; i++) {
            expect(featuredCategories.children[i].children[0]).toHaveAttribute("href", expect.stringContaining(window.location.origin + `/results/`));
        }
    });

    it("Should render only 8 categories in total with 2 being the titles", async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        let mostViewedCategories = screen.getByTestId("Most Viewed Categories-container");
        let featuredCategories = screen.getByTestId("Featured Categories-container");
        expect(mostViewedCategories.childElementCount).toEqual(5);
        expect(featuredCategories.childElementCount).toEqual(5);
    });

    it("Should render the categories menu", async () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText(/All Categories/)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId("category link").length).toEqual(50); 
        });
    });
});