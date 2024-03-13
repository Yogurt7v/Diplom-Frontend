import style from "./busket-card.module.css";
import busket from "../../../icons/Busket.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// import { useState } from "react";

export const BusketCard = () => {
  


  useEffect(() => {

    }, []);
  return (
    <>
      <div className={style.BusketCardWrapper}>
        <div>
          <div className={style.BusketCardTitle}>Корзина</div>
          <div> в корзине:</div>
          <div className={style.BusketCardSum}>
            <div className={style.BusketCardTitle}>X наименований</div>
            <div className={style.BusketCardTitle}> на сумму</div>
          </div>
        </div>
        <Link to="/">
          <img src={busket} alt="busket" className={style.BusketCardImage} />
        </Link>
      </div>
    </>
  );
};

export default BusketCard;
