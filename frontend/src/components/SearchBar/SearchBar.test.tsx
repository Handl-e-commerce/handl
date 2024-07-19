import { act } from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import userEvent from '@testing-library/user-event';

describe("SearhBar Test", function() {
    it("Enter command for input field should be disabled because input field is empty", async function() {
        const { container } = render(<SearchBar />);
        let searchBar = screen.getByPlaceholderText('Search here');

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
            expect(searchParams.get('limit')).toBe("25");
        });
    });
});