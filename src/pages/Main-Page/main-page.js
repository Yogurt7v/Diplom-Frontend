import style from "./main-page.module.css";
import React from "react";
import Content from "../components/content/content.js";
import SearchBar from "../components/search-bar/search-bar.js";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { VideoBackground } from "../components";
import { useState } from "react";
import { useEffect } from "react";
import { useServerRequest } from "../../hooks/use-server-request";
import { PAGINATION_LIMIT } from "../../constants/pagination-limit";
import { getLastPageFromLinks } from "../../utils/getLastPageFromLinks";
import { SortBar } from "../components/sort-bar";

export const MainPage = () => {
  const dispatch = useDispatch();

  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseFromSearchBar, setSearchPhraseFromSearchBar] =
    useState("");

  const onSearch = () => {
    setSearchPhrase(searchPhraseFromSearchBar);
  };

  const onDelete = () => {
    setSearchPhrase("");
  };

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );
  }, [dispatch]);
  const [products, setProducts] = useState([]);
  const requestServer = useServerRequest();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    requestServer(`fetchProducts`, searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { products, links } }) => {
        setProducts(products);
        setLastPage(getLastPageFromLinks(links));
      }
    );
  }, [requestServer, page, searchPhrase]);

  return (
    <>
      <div className={style.AppWrapper}>
        <div className={style.SortBarWrapper}>
          <SortBar />
          <SearchBar
            searchPhraseFromSearchBar={searchPhraseFromSearchBar}
            setSearchPhraseFromSearchBar={setSearchPhraseFromSearchBar}
            searchPhrase={searchPhrase}
            onSearch={onSearch}
            onDelete={onDelete}
          />
        </div>
        <Content
          products={products}
          page={page}
          setPage={setPage}
          lastPage={lastPage}
        />
        <VideoBackground />
      </div>
    </>
  );
};
