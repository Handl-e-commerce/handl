import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";

function Header(): JSX.Element {
    return (
        <header>
            <img src="" alt="" />
            <SearchBar />
            <button>Sign Up</button>
            <button>Login</button>
        </header>
    )
};

export {Header}