import React from "react";
import style from "./new-style-content.module.css";
import Slider from "../slider/Slider";
import Card from "../card/card";
import SortBar from "../sort-bar/sort";
import { useState, useEffect } from "react";
import { useServerRequest } from "../../../hooks/use-server-request";
import { PAGINATION_LIMIT } from "../../../constants/pagination-limit";
import { getLastPageFromLinks } from "../../../utils/getLastPageFromLinks";
import { Pagination } from "../pagination/pagination";

export const MainContent = () => {
  const [products, setProducts] = useState([]);
  const requestServer = useServerRequest();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);

  useEffect(() => {
    requestServer(`fetchProducts`, searchPhrase, page, PAGINATION_LIMIT).then(
      ({ res: { products, links } }) => {
        setProducts(products);
        console.log(products);
        setLastPage(getLastPageFromLinks(links));
      }
    );
  }, [requestServer, page, shouldSearch]);


  return (
    <>
      <div className={style.container}>
        {products.length > 0 ? (
          <div className={style.ContentCardList}>
            {products.map(
              ({
                id,
                productName,
                image_url,
                description,
                category,
                weight,
                calories,
                ingredients,
                price,
              }) => (
                <Card
                  key={id}
                  id={id}
                  productName={productName}
                  imageUrl={image_url}
                  description={description}
                  category={category}
                  weight={weight}
                  calories={calories}
                  ingredients={ingredients}
                  price={price}
                />
              )
            )}
          </div>
        ) : (
          <div className={style.ContentCardNotFound}>Товары не найдены</div>
        )}

      </div>
        {lastPage > 1 && products.length > 0 ? (
          <Pagination setPage={setPage} page={page} lastPage={lastPage} />
        ) : null}
    </>
  );
};

export default MainContent;
