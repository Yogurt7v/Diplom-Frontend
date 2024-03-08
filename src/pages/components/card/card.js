import style from "./card.module.css";
import plus from "../../../icons/plus.svg";
import minus from "../../../icons/minus.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Card = ({
  id,
  productName,
  imageUrl,
  description,
  category,
  price,
}) => {
  const [quantity, setQuantity] = useState(1);

  const decrimetnQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className={style.CardWrapper}>
        <div className={style.CardLogo}>
          <Link to={`/products/${id}`}>
            <img src={imageUrl} alt="" className={style.CardImage} />
          </Link>
        </div>
        <div className={style.CardInfo}>
          <h3 className={style.CardTitle}>{productName}</h3>

          <div className={style.CardDescription}>
            <p className={style.CardText}>{description}</p>
          </div>
          <div className={style.CardQuantity}>
            <div className={style.Increment}>
              <div className={style.Cover}>
                <img
                  src={minus}
                  alt=""
                  onClick={() => decrimetnQuantity()}
                  className={quantity === 1 ? style.disabled : style.normal}
                />
              </div>

              <p className={style.quantityNumber}>{quantity}</p>
              <div className={style.Cover}>
                <img
                  src={plus}
                  alt=""
                  onClick={() => setQuantity(quantity + 1)}
                  className={style.normal}
                />
              </div>
            <div className={style.CardPrice}>{price}</div>
            </div>
          </div>
            <button className={style.CardButton}>Buy</button>
        </div>
      </div>
    </>
  );
};

export default Card;
