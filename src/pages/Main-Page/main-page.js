import style from "./main-page.module.css";
import { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { useServerRequest } from "../../hooks/use-server-request";
import {
  SortBar,
  Header,
  VideoBackground,
  MainContent,
  SearchBar,
  BusketCard,
} from "../components";
import { SORT_OPTIONS } from "../../constants";
import { ROLE } from "../../constants";
import { logout } from "../../Bff/operations";
import {getAllProducts} from "../../fetchs/getAllProducts";

export const MainPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const requestServer = useServerRequest();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseFromSearchBar, setSearchPhraseFromSearchBar] =
    useState("");
  const [sorting, setSorting] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const[currentPage, setCurrentPage] = useState(1);

  const sortOption = SORT_OPTIONS;

  const onSearch = () => {
    setSearchPhrase(searchPhraseFromSearchBar);
  };

  const onDelete = () => {
    setSearchPhrase("");
  };

  const onCategoryChange = (event) => {
    const category = event.target.id;
    if (!searchCategory) {
      setSearchCategory(category);
      setCurrentPage(1);
    } else {
      setSearchCategory("");
    }
  };

  const handleSort = (e) => {
    console.log(e.target.value);
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
      window.addEventListener("beforeunload", () => {
        dispatch(logout(random));
      });
      window.removeEventListener("beforeunload", () => {
        dispatch(logout(random));
      });
    }
    if (currentUserDataJSON) {
      const currentUserData = JSON.parse(currentUserDataJSON);
      dispatch(
        setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    getAllProducts(searchPhrase, searchCategory).then(
      (products) => {
        const sortObJ = sortOption.find((option) => option.value === sorting);
        const filteredProducts = products.filter((product) =>
          searchCategory ? product.category === searchCategory : product
        );
        setProducts(
          sortObJ ? sortObJ.sort(filteredProducts) : filteredProducts
        );
        setCurrentPage(1);
        setLoading(false);

      }
    );
    setLoading(false);
    // requestServer(`fetchProducts`, searchPhrase, searchCategory).then(
    //   ({ res: { products } }) => {
    //     const sortObJ = sortOption.find((option) => option.value === sorting);
    //     const filteredProducts = products.filter((product) =>
    //       searchCategory ? product.category === searchCategory : product
    //     );
    //     setProducts(
    //       sortObJ ? sortObJ.sort(filteredProducts) : filteredProducts
    //     );
    //     setCurrentPage(1);
    //     setLoading(false);

    //   }
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchPhrase, sorting, searchCategory]);



  return (
    <>
      <Header onCategoryChange={onCategoryChange} />
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
        <MainContent loading={loading} products={products} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <VideoBackground />
      </div>
    </>
  );
};
