import React, { useState } from "react";
import { SxProps, TextField } from "@mui/material";

interface ISearchBarProps {
    sx?: SxProps;
}

function SearchBar({sx}: ISearchBarProps): JSX.Element {
    let searchParams = new URL(document.location.toString()).searchParams;
    const [searchInput, setSearchInput] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        e.preventDefault();
        if (e.target) {
            setSearchInput(e.target.value);
        }
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

    const textfieldSx: SxProps = {
        paddingLeft: '16px',
        bgcolor: '#E5E5EA',
        color: '#E0E0E0',
        borderRadius: 25,
        width: '95%',
        '& fieldset': { border: 'none'},
        '& input': {padding: '5px 7px'},
        ...sx
    };

    return (
        <TextField
            type="text"
            name="search_params"
            variant="outlined"
            required
            hiddenLabel
            placeholder={searchParams.get("search-params")?.toString() ?? "Search Handl"}
            onChange={(e) => handleChange(e)}
            onKeyUp={handleKeyPress} 
            sx={textfieldSx}
        />
    );
};

export { SearchBar };