import style from "./new-style-content.module.css";
import Card from "../card/card";
import { Pagination } from "../pagination/pagination";
import { ColorRing } from "react-loader-spinner";

export const MainContent = ({ products, page, setPage, lastPage }) => {
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
          <>
            <div className={style.ContentCardNotFound}>
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
      {lastPage > 1 && products.length > 0 ? (
        <Pagination setPage={setPage} page={page} lastPage={lastPage} />
      ) : null}
    </>
  );
};

export default MainContent;
