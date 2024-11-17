import React, { useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, OutlinedInput, SxProps } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { fetchWrapper } from "../../utils/fetch-wrapper";

interface ISearchBarProps {
    isLandingPage: boolean;
}

function SearchBar({isLandingPage}: ISearchBarProps): JSX.Element {
    let searchParams = new URL(document.location.toString()).searchParams;
    const [searchInput, setSearchInput] = useState('');

    async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        e.preventDefault();
        if (e.target) {
            setSearchInput(e.target.value);
            if (e.target.value)
                await getSearchSuggestions(e.target.value);
        }
    };

    function clearSearchBar(): void {
        setSearchInput('');
        searchParams.delete("search-params");
        if (!isLandingPage) {
            window.history.replaceState("", "", `/results?${searchParams.toString()}`);
            window.location.replace(window.location.origin + "/results?" + searchParams.toString());
        };
    };

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            if (searchInput !== "" && searchInput !== undefined && searchInput !== null) {
                searchParams.set("search-params", searchInput);
                window.history.replaceState("", "", `/results?${searchParams.toString()}`);
                window.location.replace(window.location.origin + "/results?" + searchParams.toString());
            }
        }
    };

    async function getSearchSuggestions(value: string): Promise<string[]> {
            const response = await fetchWrapper(`/vendors/predictions?search-params=${value}`, 'GET');
            const predictions = (await response.json()).result;
            console.log(predictions)
            return predictions;
    };

    const textfieldSx: SxProps = {
        marginTop: isLandingPage ? '7px' : 0,
        marginBottom: isLandingPage ? '7px' : 0,
        paddingLeft: '16px',
        bgcolor: '#E5E5EA',
        borderRadius: 25,
        width: '95%',
        '& fieldset': { border: 'none'},
        '& input': {padding: '5px 7px'}
    }

    return (
        <FormControl sx={{ width: "700px" }}>
            <OutlinedInput
                type="text"
                name="search_params"
                required
                placeholder={searchParams.get("search-params")?.toString() ?? "Search Handl"}
                value={searchInput}
                onChange={(e) => handleChange(e)}
                onKeyUp={handleKeyPress} 
                sx={textfieldSx}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={clearSearchBar}
                            edge='end'
                        >
                            {searchInput ? <Cancel /> : null}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export { SearchBar };