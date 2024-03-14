import style from "./busket-card.module.css";
import busketIcon from "../../../icons/Busket.svg";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useServerRequest } from "../../../hooks";
import { useSelector } from "react-redux";
// import { useState } from "react";

export const BusketCard = () => {
  const {items} = useSelector((state) => state.busket);
  const totalItemsQuantity = items.reduce((accumulatedQuantity, item) =>
    accumulatedQuantity + item.quantity, 0);
  const totalBusketPrice = items.reduce((accumulatedPrice, currentItem) =>
    accumulatedPrice + currentItem.price * currentItem.quantity, 0);

  return (
    <>
      <div className={style.BusketCardWrapper}>
        <div>
          <div className={style.BusketCardTitle}>Заказ</div>
          <div className={style.BusketCardSum}>
            <div className={style.BusketCardTitle}>{totalItemsQuantity} наименований</div>
            <div className={style.BusketCardTitle}> на сумму {totalBusketPrice} $</div>
          </div>
        </div>
        <Link to="/busket">
          <img
            src={busketIcon}
            alt="busket"
            className={style.BusketCardImage}
          />
        </Link>
      </div>
    </>
  );
};

export default BusketCard;
