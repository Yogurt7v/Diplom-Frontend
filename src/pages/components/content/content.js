import style from "./new-style-content.module.css";
import Card from "../card/card";
import { Pagination } from "../pagination/pagination";

export const MainContent = ({products,page, setPage, lastPage}) => {


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
