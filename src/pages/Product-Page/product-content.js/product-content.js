import style from "./product-content.module.css";
import { useNavigate } from "react-router-dom";
import { SpecialPanel } from "../special-panel/special-panel";
import editButton from "../../../icons/editButon.svg";
import { VideoBackground } from "../../components/video-background.js/video-background";
import { Comments } from "../../components/comments";

export const ProductContent = ({
  product: {
    id,
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
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.ProductWrapper}>
        <div className={style.ProductInfo}>
          <img
            src={image_url}
            alt={productName}
            className={style.ProductImage}
          ></img>
          <h2 className={style.ProductTitle}>{productName}</h2>
          <SpecialPanel
            id={id}
            editButton={
              <div onClick={() => navigate(`/products/${id}/edit`)}>
                <img src={editButton} alt="edit" className={style.EditButton} />
              </div>
            }
          />
          <div className={style.ProductDescription}>{description}</div>
          <div className={style.ProductDescription}>{weight}</div>
          <div className={style.ProductDescription}>{calories}</div>
          <div className={style.ProductDescription}>{ingredients}</div>
          <div className={style.ProductDescription}>{price} $</div>
          <button onClick={() => navigate(-1)} className={style.BackButton}>
            Back
          </button>
          <Comments comments={comments} productId={id} />
        </div>
      </div>
      <VideoBackground />
    </>
  );
};
