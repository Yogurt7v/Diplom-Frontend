import style from "./main-page.module.css";
import { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import {
  SortBar,
  Header,
  MainContent,
  SearchBar,
  BusketCard,
} from "../components";
import { SORT_OPTIONS, ROLE } from "../../constants";
import { getAllProducts, sessions } from "../../fetchs";

export const MainPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseFromSearchBar, setSearchPhraseFromSearchBar] =
    useState("");
  const [sorting, setSorting] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const sortOption = SORT_OPTIONS;

  const onSearch = () => {
    setSearchPhrase(searchPhraseFromSearchBar);
  };

  const onDelete = () => {
    setSearchPhrase("");
  };

  const [isActiveItem, setActiveItem] = useState("");

  const onCategoryChange = (event) => {
    const category = event.target.id;
        if (category === "All") {
          setSearchCategory(null);
          setActiveItem("");

    }else {
      setActiveItem(category);
      setSearchCategory(category);
      setCurrentPage(1);
    }
  };

  const handleSort = (e) => {
    setSorting(e.target.value);
  };

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");
    const random = Math.random().toFixed(50);
    if (!currentUserDataJSON) {
      dispatch(
        setUser({
          id: -1,
          login: "guest",
          roleId: ROLE.GUEST,
          session: random,
        })
      );
    }
    if (currentUserDataJSON) {
      const currentUserData = JSON.parse(currentUserDataJSON);
      dispatch(
        setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
      );
    }
  }, []);
  
  useEffect(() => {
    getAllProducts(searchPhrase, searchCategory).then((products) => {
      const sortObJ = sortOption.find((option) => option.value === sorting);
      const filteredProducts = products.filter((product) =>
        searchCategory ? product.category === searchCategory : product
      );
      setProducts(sortObJ ? sortObJ.sort(filteredProducts) : filteredProducts);
      setCurrentPage(1);
      setLoading(false);
    });
  }, [searchPhrase, searchCategory, sorting, sortOption]);

  return (
    <>
      <Header onCategoryChange={onCategoryChange} isActiveItem={isActiveItem} loading={loading} />
      <div className={style.AppWrapper}>
        <div className={style.SortBarWrapper}>
          <SortBar options={sortOption} onSort={handleSort} />
          <SearchBar
            searchPhraseFromSearchBar={searchPhraseFromSearchBar}
            setSearchPhraseFromSearchBar={setSearchPhraseFromSearchBar}
            searchPhrase={searchPhrase}
            onSearch={onSearch}
            onDelete={onDelete}
          />
          <BusketCard />
        </div>
        <MainContent
          loading={loading}
          products={products}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};
