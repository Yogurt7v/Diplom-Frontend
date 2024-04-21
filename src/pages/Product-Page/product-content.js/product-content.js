import style from "./product-content.module.css";
import { useNavigate } from "react-router-dom";
import { SpecialPanel } from "../special-panel/special-panel";
import editButton from "../../../icons/editButon.svg";
import close from "../../../icons/close.svg";
import { VideoBackground } from "../../components/video-background.js/video-background";
import { Comments } from "../../components/comments";

export const ProductContent = ({
  product: {
    _id,
    productName,
    image_url,
    description,
    category,
    weight,
    calories,
    ingredients,
    price,
    comments,
  },
  allComments,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.ProductWrapper}>
        <div className={style.ProductInfo}>
          <div className={style.ProductImageSection}>
            <img
              src={image_url}
              alt={productName}
              className={style.ProductImage}
            ></img>
            <div className={style.ProductTitleWrapper}>
              <h2 className={style.ProductTitle}>{productName}</h2>
              <SpecialPanel
                id={_id}
                editButton={
                  <div onClick={() => navigate(`/products/${_id}/edit`)}>
                    <img
                      src={editButton}
                      alt="edit"
                      className={style.EditButton}
                    />
                  </div>
                }
              />
              <div className={style.ProductDescription}>{description}</div>
              <div className={style.ProductNutrition}>
                <div className={style.ProductDescriptionNumbers}>
                  Вес: {weight} г.
                </div>
                <div className={style.ProductDescriptionNumbers}>
                  Калории: {calories} ккал.
                </div>
                <div className={style.ProductPrice}> {price} $</div>{" "}
                {/* <button className={style.BuyButton}>Купить</button> */}
              </div>
            </div>
          </div>

          <div className={style.ProductIngredients}>
            Ингриденты: {ingredients}
          </div>
          <img src={close} alt="close" className={style.CloseButton} onClick={() => navigate(-1)}/>
          <Comments comments={allComments} productId={_id} />
        </div>
      </div>
      <VideoBackground />
    </>
  );
};
