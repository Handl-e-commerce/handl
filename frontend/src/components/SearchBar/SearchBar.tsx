import React, { useState } from "react";
import { TextField } from "@mui/material";

function SearchBar(): JSX.Element {
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

    return (
        <TextField
            type="text"
            value={searchParams.get("search-params")?.toString() ?? searchInput}
            name="search_params"
            variant="outlined"
            required
            hiddenLabel
            placeholder={searchParams.get("search-params")?.toString() ?? "Search here"}
            onChange={(e) => handleChange(e)}
            onKeyUp={handleKeyPress} 
            sx={{
                marginTop: '7px',
                marginBottom: '7px',
                paddingLeft: '16px',
                bgcolor: 'Background',
                borderRadius: 25,
                width: '95%',
                '& fieldset': { border: 'none'},
            }}
        />
    );
};

export { SearchBar };