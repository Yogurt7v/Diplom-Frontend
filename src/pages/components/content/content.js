import style from "./new-style-content.module.css";
import Card from "../card/card";
import { useEffect, useState } from "react";
import { Pagination } from "../pagination/pagination";
import SkeletonCard from "../skeleton/SkeletonCard";

export const MainContent = ({
  products,
  loading,
  currentPage,
  setCurrentPage,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 500);
  };
  window.addEventListener("resize", handleResize);

  const [perPage, setPerPage] = useState(4);

  useEffect(() => {
    if (windowWidth > 1350) {
      setPerPage(4);
    }
    if (windowWidth <= 1350) {
      setPerPage(3);
    }
    if (windowWidth <= 1030) {
      setPerPage(2);
    }
    if (windowWidth <= 970) {
      setPerPage(1);
    }
  }, [windowWidth, setWindowWidth]);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < products.length / perPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className={style.container}>
        {!loading ? (
          <div className={style.ContentCardList}>
            {currentProducts.map(
              ({
                _id,
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
                  key={_id}
                  id={_id}
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
          [...new Array(4)].map((index) => <SkeletonCard key={index} />)
        )}
      </div>
      <Pagination
        perPage={perPage}
        products={products}
        paginate={paginate}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </>
  );
};

export default MainContent;
