import style from "./search-bar.module.css";
import search from "../../../icons/search.svg";
import erase from "../../../icons/erase.svg";

export const SearchBar = ({
  searchPhraseFromSearchBar,
  setSearchPhraseFromSearchBar,
  searchPhrase,
  onSearch,
  onDelete,
}) => {
  return (
    <div className={style.SearchBarWrapper}>
      <input
        type="text"
        className={style.SearchBarInput}
        placeholder="Search for ingredients..."
        value={searchPhraseFromSearchBar}
        onChange={(e) => setSearchPhraseFromSearchBar(e.target.value)}
      ></input>
      {searchPhraseFromSearchBar.length < 2 ? null : (
        <>
          <img
            src={search}
            className={style.SearchBarIcon}
            alt="search"
            onClick={() => onSearch(searchPhrase)}
          />
          <img
            src={erase}
            className={style.SearchBarEraseIcon}
            alt="erase"
            onClick={() => {
              setSearchPhraseFromSearchBar("");
              onDelete();
            }}
          />
        </>
      )}
    </div>
  );
};

export default SearchBar;
