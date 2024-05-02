import style from "./product-content.module.css";
import { useNavigate } from "react-router-dom";
import { SpecialPanel } from "../special-panel/special-panel";
import editButton from "../../../icons/editButon.svg";
import close from "../../../icons/close.svg";
import { VideoBackground } from "../../components/video-background.js/video-background";
import { Comments } from "../../components/comments";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addBusketData } from "../../../actions/add-busket-data";

export const ProductContent = ({
  product: {
    id,
    productName,
    image_url,
    description,
    weight,
    calories,
    ingredients,
    price,
  },
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addProductToBusket = (userId,  productId, productName, quantity = 1, price) => {
    const randomId = (Math.random()* 1000000).toFixed(0);
    dispatch(addBusketData({randomId, userId,  productId, productName, quantity, price }));
  };

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
                id={id}
                editButton={
                  <div onClick={() => navigate(`/products/${id}/edit`)}>
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
                <button className={style.BuyButton} onClick={()=> addProductToBusket(user.id, id, productName, 1, price)}>Купить</button>
              </div>
            </div>
          </div>

          <div className={style.ProductIngredients}>
            Ингриденты: {ingredients}
          </div>
          <img src={close} alt="close" className={style.CloseButton} onClick={() => navigate("/")}/>
          <Comments/>
        </div>
      </div>
      <VideoBackground />
    </>
  );
};
