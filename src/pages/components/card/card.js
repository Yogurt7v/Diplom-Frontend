import style from "./card.module.css";
import burger1 from "./Image/1.jpg";

export const Card = () => {
  return (
    <>
      <div className={style.CardWrapper}>
        <div className={style.CardLogo}>
          <img src={burger1} alt="burger" className={style.CardImage} />
        </div>
        <div className={style.CardInfo}>
          <h3 className={style.CardTitle}>Title</h3>
          <div className={style.CardDescription}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
              aspernatur expedita esse laboriosam est!
            </p>
            <div className={style.CardButtonWrapper}>
              <div className={style.CardPrice}>15$</div>
              <button className={style.CardButton}>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
