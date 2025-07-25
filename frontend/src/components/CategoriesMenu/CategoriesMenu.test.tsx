import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CategoriesMenu } from './CategoriesMenu';
import userEvent from '@testing-library/user-event';

describe("CategoriesMenu Test", () => {
    it("Should render the list of categories for us to be able to select", async () => {
        render(<CategoriesMenu />);
        await userEvent.click(screen.getByText("Categories"));
        expect(screen.getAllByRole("menuitem").length).toEqual(50);
    });

    it("Should redirect to results with category as the query param", async () => {
        render(<CategoriesMenu />);
        expect(window.location.pathname).not.toContain("/results/");
        await userEvent.click(screen.getByText("Categories"));
        await userEvent.click(screen.getAllByRole("menuitem")[0]);
        // Honestly this isn't a super importnat test, 
        // but it's just to make sure that the redirect works upon clicking a category
        expect(window.location.pathname).toContain("/results/");
    });
});