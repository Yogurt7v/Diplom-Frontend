import style from "./SearchBar.module.css";
import React from "react";


export const SearchBar = () => {
    return (
        <div className={style.SearchBarWrapper}>
            <input type="text" className={style.SearchBarInput}></input>
        </div>
    );
}

export default SearchBar