import style from "./main-page.module.css";
import { useLayoutEffect, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../actions";
import { useServerRequest } from "../../hooks/use-server-request";
import { SortBar, Header, VideoBackground, MainContent, SearchBar,BusketCard  } from "../components";
import { SORT_OPTIONS } from "../../constants";
import { ROLE } from "../../constants";
import { logout } from "../../Bff/operations";

export const MainPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const requestServer = useServerRequest();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [searchPhraseFromSearchBar, setSearchPhraseFromSearchBar] =
    useState("");
  const [sorting, setSorting] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  //   {
  //     value: "priceDESC",
  //     label: "по цене по убыванию",
  //     sort: (data) => _.orderBy(data, ["price"], ["desc"]),
  //   },
  //   {
  //     value: "priceASC",
  //     label: "по цене по возрастанию",
  //     sort: (data) => _.orderBy(data, ["price"], ["asc"]),
  //   },
  //   {
  //     value: "weightASC",
  //     label: "по весу по возрастанию",
  //     sort: (data) => _.orderBy(data, ["weight"], ["asc"]),
  //   },
  //   {
  //     value: "weightDESC",
  //     label: "по весу по убыванию",
  //     sort: (data) => _.orderBy(data, ["weight"], ["desc"]),
  //   },
  //   {
  //     value: "caloriesASC",
  //     label: "по калорийности по возрастанию",
  //     sort: (data) => _.orderBy(data, ["calories"], ["asc"]),
  //   },
  //   {
  //     value: "caloriesDESC",
  //     label: "по калорийности по убыванию",
  //     sort: (data) => _.orderBy(data, ["calories"], ["desc"]),
  //   },
  // ];

  const sortOption = SORT_OPTIONS;

  const onSearch = () => {
    setSearchPhrase(searchPhraseFromSearchBar);
  };

  const onDelete = () => {
    setSearchPhrase("");
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
        dispatch( logout(random) );
      })
      window.removeEventListener("beforeunload", () => {
        dispatch( logout(random) );
      })
    }
    if(currentUserDataJSON){

      const currentUserData = JSON.parse(currentUserDataJSON);
      dispatch(
        setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    requestServer(`fetchProducts`, searchPhrase, searchCategory).then(
      ({ res: { products } }) => {

        const sortObJ = sortOption.find((option) => option.value === sorting);
        const filteredProducts = products.filter((product) =>
        searchCategory ? product.category === searchCategory : product
        );
        setProducts(sortObJ ? sortObJ.sort(filteredProducts) : filteredProducts);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestServer, searchPhrase, sorting, searchCategory]);
  

const onCategoryChange = (event) => {
  const category = event.target.textContent.toLowerCase().slice(0, -1);
  if (!searchCategory){
    setSearchCategory(category)
  } else {
    setSearchCategory('')
  }
}

  const handleSort = (e) => {
    setSorting(e.target.value);
  };

  return (
    <>
      <Header  onCategoryChange={onCategoryChange}/>
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
          <BusketCard/>
        </div>
        <MainContent 
          products={products}
        />
        <VideoBackground />
      </div>
    </>
  );
};
