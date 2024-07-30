import React, { useState } from "react";
// import "./SearchBar.css"

function SearchBar(): JSX.Element {
    const [searchInput, setSearchInput] = useState("");

    function handleChange(e: any) {
        e.preventDefault();
        if (e.target) {
            setSearchInput(e.target.value);
        }
    };

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            // redirect to "/results?search-params=xyz&offset=1&limit=25"
            let searchParams = new URL(document.location.toString()).searchParams;
            if (searchInput !== "" && searchInput !== undefined && searchInput !== null) {
                searchParams.set("search-params", searchInput);
                searchParams.set("offset", "1");
                searchParams.set("limit", "25");
                window.history.replaceState("", "", `/results?${searchParams.toString()}`);
                window.location.replace(window.location.origin + "/results?" + searchParams.toString());
            }
        }
    };

    return (
        <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
            name="search_params"
            required={true}
            className="search-input"
            onKeyUp={handleKeyPress}
        />
    );
};

export { SearchBar };