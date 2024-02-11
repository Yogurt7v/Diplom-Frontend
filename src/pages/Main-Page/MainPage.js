import style from "./MainPage.module.css";
import Header from "../components/header/Header.jsx";
import MainContent from "../components/main-content/mainContent.jsx";
import SearchBar from "../components/search-bar/SearchBar.jsx";

function MainPage() {
  return (
    <>
      <Header />
      <div className={style.AppWrapper}>
        <SearchBar />
        <MainContent />
      </div>
    </>
  );
}

export default MainPage;
