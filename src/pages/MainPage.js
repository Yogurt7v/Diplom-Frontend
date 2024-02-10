import style from './MainPage.module.css';
import Header from './components/header/Header.jsx';
import MainContent from "./components/main-content/mainContent.jsx";
import SearchBar from './components/search-bar/SearchBar.jsx';


function MainPage() {
  return (
    <div className={style.AppWrapper}>
      <Header />
      <SearchBar />
      <MainContent />
    </div>
  );
}

export default MainPage;
