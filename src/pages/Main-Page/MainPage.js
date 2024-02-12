import style from "./MainPage.module.css";
import React from "react";
import MainContent from "../components/main-content/mainContent.jsx";
import SearchBar from "../components/search-bar/SearchBar.jsx";

function MainPage() {
  return (
    <>
      <div className={style.AppWrapper}>
        <SearchBar />
        <MainContent />
      </div>
    </>
  );
}

export default MainPage;
