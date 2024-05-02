import style from "./new-style-content.module.css";
import Card from "../card/card";
import { useState } from "react";
import { Pagination } from "../pagination/pagination";
// import { ColorRing } from "react-loader-spinner";
import SkeletonCard  from "..//skeleton/SkeletonCard";

export const MainContent = ({ products, loading, currentPage, setCurrentPage }) => {


  const [perPage] = useState(4);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const paginate =(pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const nextPage = () => {
    if (currentPage < products.length / perPage) {
      setCurrentPage((prev)=> prev + 1);
    }
  }

  const previousPage = () => {
    if (currentPage > 1){
      setCurrentPage((prev)=> prev - 1);
    }
  }


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
          [...new Array(4)].map((index) => (
            <SkeletonCard key={index}/>
          ))
          // <>
          //   <div className={style.ContentCardNotFound}>
          //     <ColorRing
          //       visible={true}
          //       height="180"
          //       width="180"
          //       ariaLabel="color-ring-loading"
          //       wrapperStyle={{}}
          //       wrapperClass="color-ring-wrapper"
          //       colors={["#000000", "#ED780B", "#E43306", "#8e1c00", "#d6c400"]}
          //     />
          //   </div>
          // </>
        )}
      </div>
        <Pagination perPage={perPage} products={products} paginate={paginate} nextPage={nextPage} previousPage={previousPage}/>
    </>
  );
};

export default MainContent;


//здесь лежит пагинация и лоадер
