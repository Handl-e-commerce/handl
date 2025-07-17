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
        let featuredCategories = screen.getByTestId("Featured Categories-container");
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