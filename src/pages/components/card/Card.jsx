import style from "./card.module.css";

export const Card = () => {
  return (
    <>
      <div className={style.CardWrapper}>
        <div className={style.CardLogo}></div>
        <div className={style.CardInfo}>
          <h3 className={style.CardTitle}>Title</h3>
          <div className={style.CardDescription}>
            <p>Lorem, ipsum.</p>
            <div className={style.CardPrice}>500$</div>
            <div className={style.CardButtonWrapper}>
              <button className={style.CardButton}>Info</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
