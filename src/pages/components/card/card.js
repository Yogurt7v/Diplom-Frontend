import style from "./card.module.css";
import plus from "../../../icons/plus.svg"
import minus from "../../../icons/minus.svg"
import React, { useState } from "react";


export const Card = ({id, productName, imageUrl, description, category, price}) => {

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
          <img src={imageUrl} alt="" className={style.CardImage} />
        </div>
        <div className={style.CardInfo}>
          <h3 className={style.CardTitle}>{productName}</h3>
          <div className={style.CardDescription}>
            <p>
              {description}
            </p>
            <div className={style.CardButtonWrapper}>
              <div className={style.CardQuantity}>
                <img src={minus} alt="" onClick={() => decrimetnQuantity() } className={quantity === 1 ? style.disabled : style.normal}/>
                <div>
                  <p>{quantity}</p>
                </div>
                <img src={plus} alt="" onClick={() => setQuantity(quantity + 1)} className={style.normal}/>
              <div className={style.CardPrice}>{price}</div>
              <button className={style.CardButton}>Buy</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Card;
