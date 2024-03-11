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
import { Header } from "../components";
import _ from "lodash";

export const MainPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const requestServer = useServerRequest();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseFromSearchBar, setSearchPhraseFromSearchBar] =
    useState("");
  const [sorting, setSorting] = useState("");
  const [categories, setCategories] = useState("");
  const [sortingInProgress, setSortingInProgress] = useState(false);

  const sortOption = [
    {
      value: "priceDESC",
      label: "по цене по убыванию",
      sort: (data) => _.orderBy(data, ["price"], ["desc"]),
    },
    {
      value: "priceASC",
      label: "по цене по возрастанию",
      sort: (data) => _.orderBy(data, ["price"], ["asc"]),
    },
    {
      value: "weightASC",
      label: "по весу по возрастанию",
      sort: (data) => _.orderBy(data, ["weight"], ["asc"]),
    },
    {
      value: "weightDESC",
      label: "по весу по убыванию",
      sort: (data) => _.orderBy(data, ["weight"], ["desc"]),
    },
    {
      value: "caloriesASC",
      label: "по калорийности по возрастанию",
      sort: (data) => _.orderBy(data, ["calories"], ["desc"]),
    },
    {
      value: "caloriesDESC",
      label: "по калорийности по убыванию",
      sort: (data) => _.orderBy(data, ["calories"], ["asc"]),
    },
  ];

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

  useEffect(() => {
    requestServer(`fetchProducts`, searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { products, links } }) => {
        setProducts(products);
        setLastPage(getLastPageFromLinks(links));
      }
    );
  }, [requestServer, page, searchPhrase]);

  useEffect(() => {
    requestServer(`fetchProducts`, searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { products } }) => {
        const sortObJ = sortOption.find((option) => option.value === sorting);
        if (sortObJ) {
          setProducts(sortObJ.sort(products));
        }
        if (categories) {
          setProducts(products.filter((product) => product.category === categories));
        }
        if (categories === "") {
          setProducts(products);
        }
      }
    );
  }, [sorting, categories]);


  const onCategoryChange = (e) => {
    let target = e.target.textContent.toLowerCase().slice (0, -1);
    setSortingInProgress(!sortingInProgress);
    if (sortingInProgress) {
      setCategories(target);
    }
    if (!sortingInProgress) {
      setCategories("");
    }
    
  };

  const handleSort = (e) => {
    setSorting(e.target.value);
  };
  return (
    <>
      <Header  onCategoryChange={onCategoryChange}/>
      <div className={style.AppWrapper}>
        <div className={style.SortBarWrapper}>
          <SortBar options={sortOption} onSort={handleSort} value={sorting} />
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
