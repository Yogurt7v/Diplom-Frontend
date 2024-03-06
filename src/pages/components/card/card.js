import style from "./card.module.css";


export const Card = ({id, productName, imageUrl, description, category, price}) => {
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
              <div className={style.CardPrice}>{price}</div>
              <button className={style.CardButton}>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
