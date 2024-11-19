import React, { useEffect, useState } from "react";
import { FormControl, IconButton, InputAdornment, Autocomplete, OutlinedInput, SxProps, TextField } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { fetchWrapper } from "../../utils/fetch-wrapper";

interface ISearchBarProps {
    isLandingPage: boolean;
}

function SearchBar({isLandingPage}: ISearchBarProps): JSX.Element {
    let searchParams = new URL(document.location.toString()).searchParams;
    const [searchInput, setSearchInput] = useState<string>('');
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [hasArrowKey, setHasArrowKey] = useState<boolean>(false);

    useEffect(() => {
        if (searchInput == "")
            setSearchSuggestions([]);
    }, [searchInput])

    async function handleChange(e: React.SyntheticEvent<Element, Event>) {
        let inputEvent = e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
        inputEvent.preventDefault();
        if (inputEvent.target) {
            console.log(inputEvent.target.value);
            setSearchInput(inputEvent.target.value);
            if (inputEvent.target.value)
                await getSearchSuggestions(inputEvent.target.value);
        }
    };

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            if (searchInput !== "" && searchInput !== undefined && searchInput !== null) {
                searchParams.set("search-params", searchInput);
                window.history.pushState("", "", `/results?${searchParams.toString()}`);
                window.location.replace(window.location.origin + "/results?" + searchParams.toString());
            }
        }
        if (e.key === 'Escape') {
            setSearchInput('');
        }
    };

    async function getSearchSuggestions(value: string): Promise<void> {
            const response = await fetchWrapper(`/vendors/predictions?search-params=${value}`, 'GET');
            const predictions = (await response.json()).result;
            setSearchSuggestions(predictions);
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
            <Autocomplete
                freeSolo
                autoComplete
                id="search-bar-autocomplete-component"
                options={searchSuggestions}
                sx={{ 
                    '&.MuiAutocomplete-root .MuiOutlinedInput-root': { padding: '0px' },
                    ...textfieldSx 
                }}
                onInputChange={handleChange}
                onKeyUp={handleKeyPress}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </FormControl>
    );
};

export { SearchBar };