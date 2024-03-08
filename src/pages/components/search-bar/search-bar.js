import style from "./search-bar.module.css";
import React from "react";




export const SearchBar = () => {
  return (
    <div className={style.SearchBarWrapper}>
        <input type="text" className={style.SearchBarInput} placeholder="Search"></input>
    </div>
  );
};

export default SearchBar;
