import style from "./busket-card.module.css";
import busketIcon from "../../../icons/Busket.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useServerRequest } from "../../../hooks";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../selectors";
// import { useState } from "react";

export const BusketCard = () => {
  const requestServer = useServerRequest();
  const [busket, setBusket] = useState([]);
  const[userBusket, setUserBusket] = useState([]);
  const userOnPage = useSelector(selectUserId);

  useEffect(() => {
    requestServer(`fecthBusket`).then((result) => {
      setBusket(result.res);
    });

    setUserBusket(busket.filter(item => item.userId === userOnPage));

  }, [requestServer]);

  return (
    <>
      <div className={style.BusketCardWrapper}>
        <div>
          <div className={style.BusketCardTitle}>Корзина</div>
          <div> в корзине: </div>
          <div className={style.BusketCardSum}>
            <div className={style.BusketCardTitle}>{userBusket.length} наименований</div>
            <div className={style.BusketCardTitle}> на сумму {userBusket.map((item) => item.priceForOne * item.quantity).reduce((a, b) => a + b, 0)}</div>
          </div>
        </div>
        <Link to="/">
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
