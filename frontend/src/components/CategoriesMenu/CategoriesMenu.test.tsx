import { describe, expect, it } from '@jest/globals';
import { render, screen, act, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CategoriesMenu } from './CategoriesMenu';
import userEvent from '@testing-library/user-event';

describe("QueryDropDown Test", () => {
    it("Should render the list of categories for us to be able to select", async () => {
        render(<CategoriesMenu />);
        await userEvent.click(screen.getByText("Categories"));
        expect(screen.getAllByRole("menuitem").length).toEqual(50);
    });

    it("Should redirect to results with category as the query param", async () => {
        render(<CategoriesMenu />);
        await userEvent.click(screen.getByText("Categories"));
        await userEvent.click(screen.getAllByRole("menuitem")[0]);
        expect(window.location.pathname).toContain("/results");
        expect(window.location.search).toContain("category");
    });
});