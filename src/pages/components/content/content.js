import style from "./new-style-content.module.css";
import Card from "../card/card";
import { useEffect, useState } from "react";
// import { Pagination } from "../pagination/pagination";
import { ColorRing } from "react-loader-spinner";

export const MainContent = ({ products, currentUser, loading }) => {

 // нужен при запросе данных и спиннер с ним
  const[currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);


  // useEffect(() => {
  //   const 
  // }, []);

  return (
    <>
      <div className={style.container}>
        {!loading ? (
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
                  currentUser={currentUser}
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
          <>
            <div className={style.ContentCardNotFound}> Товары не найдены
              <ColorRing
                visible={true}
                height="180"
                width="180"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#000000", "#ED780B", "#E43306", "#8e1c00", "#d6c400"]}
              />
            </div>
          </>
        )}
      </div>
      {/* {lastPage > 1 && products.length > 0 ? (
        <Pagination setPage={setPage} page={page} lastPage={lastPage} />
      ) : null} */}
    </>
  );
};

export default MainContent;


//здесь лежит пагинация и лоадер
