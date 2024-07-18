import { describe, expect, it } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { click } from '@testing-library/user-event/dist/click';
import userEvent from '@testing-library/user-event';

describe("SearhBar Test", function() {
    it("Enter for input field and Search button should be disabled because input field is empty", async function() {
        const { container } = render(<SearchBar />);
        let searchIcon = screen.getByTestId('search-icon');
        let searchBar = screen.getByPlaceholderText('Search here');
        act(() => {
            click(searchIcon);
        });
        expect(searchBar).toBeRequired;
        let searchParams = new URL(document.location.toString()).searchParams;
        expect(searchParams.get('search-params')).toBeUndefined;
        expect(searchParams.get('offset')).toBeUndefined;
        expect(searchParams.get('limit')).toBeUndefined;
    });
    
    it("Should change the url search params when user presses enter", async function() {
        const { container } = render(<SearchBar />);
        
        let searchBar = screen.getByPlaceholderText('Search here');
        expect(searchBar).toBeRequired;
        act(() => {
            userEvent.type(searchBar, "Test Search Query{enter}");
        });
        waitFor(() => {
            let searchParams = new URL(document.location.toString()).searchParams;
            expect(searchParams.get('search-params')).toBe("Test Search Query");
            expect(searchParams.get('offset')).toBe("1");
            expect(searchParams.get('limit')).toBe("20");
        });
    });

    it("Should change the url search params when user clicks search button", async function() {
        const { container } = render(<SearchBar />);
        let searchIcon = screen.getByTestId('search-icon');
        let searchBar = screen.getByPlaceholderText('Search here');

        act(() => {
            userEvent.type(searchBar, "Test Search Query");
            click(searchIcon);
        });
        waitFor(() => {
            let searchParams = new URL(document.location.toString()).searchParams;
            expect(searchParams.get('search-params')).toBe("Test Search Query");
            expect(searchParams.get('offset')).toBe("1");
            expect(searchParams.get('limit')).toBe("20");
        });
    });

});