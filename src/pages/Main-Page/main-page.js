import style from "./main-page.module.css";
import React from "react";
import Content from "../components/content/content.js";
import SearchBar from "../components/search-bar/search-bar.js";

export const MainPage = () => {
  return (
    <>
      <div className={style.AppWrapper}>
        <SearchBar />
        <Content />
      </div>
    </>
  );
}


