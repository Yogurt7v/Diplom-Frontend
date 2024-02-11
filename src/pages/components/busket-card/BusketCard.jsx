import style from "./BusketCard.module.css";

export const BusketCard = () => {
  return (
    <>
      <div className={style.BusketCardWrapper}>
        <img src="" alt="fotoItem" className={style.BusketCardImage} />
        <div className={style.BusketCardInfo}>
          <h3>Id item</h3>
          <div className={style.BusketCardInfoWrapper}>
            <div className={style.BusketCardItem}>
              <div className={style.BusketCardName}>Name</div>
              <div className={style.BusketCardNumber}>name</div>
            </div>
            <div className={style.BusketCardItem}>
              <div className={style.BusketCardName}>Quantity</div>
              <div className={style.BusketCardNumber}>quntity</div>
            </div>
            <div className={style.BusketCardItem}>
              <div className={style.BusketCardName}>Price</div>
              <div className={style.BusketCardNumber}>price</div>
            </div>
          </div>
        </div>
        <div className={style.BusketCardButtonWrapper}>
          <button className={style.BusketCardButton}>
            <img src="" alt="" />X
          </button>
        </div>
      </div>
    </>
  );
};

export default BusketCard;
