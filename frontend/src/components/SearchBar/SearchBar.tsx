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

    return (
        <form className="search-bar-container">
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
                name="search_params"
                required={true}
                className="search-input"
            />
            <input type="hidden" name="offset" value={"1"}/>
            <input type="hidden" name="limit" value={"25"}/>
        </form>
    );
};

export { SearchBar };