import React, { useState } from "react";
// import "./SearchBar.css"
import { IoIosSearch } from "react-icons/io";

function SearchBar(): JSX.Element {
    const [searchInput, setSearchInput] = useState("");

    function handleChange(e: any) {
        e.preventDefault();
        if (e.target) {
            setSearchInput(e.target.value);
        }
    };
    
    function handleSubmit() {
        // redirect to "/?search-params=xyz&offset=1&limit=25"
        let searchParams = new URL(document.location.toString()).searchParams;
        if (searchInput !== "" && searchInput !== undefined && searchInput !== null) {
            searchParams.set("search-params", searchInput);
            searchParams.set("offset", "1");
            searchParams.set("limit", "25");
            window.history.replaceState("", "", `?${searchParams.toString()}`);
        }
    }

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
            <IoIosSearch 
                onClick={handleSubmit} 
                size={"26px"}
                style={{
                    borderTopRightRadius: "15px",
                    borderBottomRightRadius: "15px",
                    background: "white",
                    color: "#142a4a",
                    marginTop: "5px",
                    border: "solid 1px #142a4a",
                    width: "60px",
                    cursor: "pointer" 
                }}
                aria-disabled={searchInput === ""}
                data-testid={'search-icon'}
            />
            <input type="hidden" name="offset" value={"1"}/>
            <input type="hidden" name="limit" value={"25"}/>
        </form>
    );
};

export { SearchBar };