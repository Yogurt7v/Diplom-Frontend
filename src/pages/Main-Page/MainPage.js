import style from "./MainPage.module.css";
import React from "react";
import Content from "../components/content/Content.jsx";
import SearchBar from "../components/search-bar/SearchBar.jsx";

function MainPage() {
  return (
    <>
      <div className={style.AppWrapper}>
        <SearchBar />
        <Content />
      </div>
    </>
  );
}

export default MainPage;
