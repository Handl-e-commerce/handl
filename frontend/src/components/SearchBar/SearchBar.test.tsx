import { act } from 'react';
import { describe, expect, it } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import userEvent from '@testing-library/user-event';

describe("SearhBar Test", function() {
    const user = userEvent.setup();
    it("Enter command for input field should be disabled because input field is empty", async function() {
        const { container } = render(<SearchBar isLandingPage={true}/>);
        let searchBar = screen.getByPlaceholderText('Search Handl');

        expect(searchBar).toBeRequired;
        
        let searchParams = new URL(document.location.toString()).searchParams;
        expect(searchParams.get('search-params')).toBeUndefined;
    });
    
    it("Should change the url search params when user presses enter", async function() {
        const { container } = render(<SearchBar isLandingPage={true}/>);
        
        let searchBar = screen.getByPlaceholderText('Search Handl');
        expect(searchBar).toBeRequired;
        await user.type(searchBar, "Test Search Query{enter}");
        await waitFor(() => {
            let searchParams = new URL(document.location.toString()).searchParams;
            expect(searchParams.get('search-params')).toBe("Test Search Query");
        });
    });
});