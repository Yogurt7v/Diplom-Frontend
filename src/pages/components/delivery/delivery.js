import { useEffect, useState } from "react";
import style from "./delivery.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    openModal,
    CLOSE_MODAL,
  } from "../../../actions";


export const Delivery = () => {

    const [getOrder, setOrder] = useState(false);
    const [orderInTransfer, setOrderInTransfer] = useState(false);
    const [orderDelivered, setOrderDelivered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setOrder(true);
    }, 7000);
    setTimeout(() => {
      setOrderInTransfer(true)
    }, 14000);
    setTimeout(() => {
      setOrderDelivered(true);
    }, 21000);
    setTimeout(() => {
        dispatch(
            openModal({
              text: "Спасибо за заказ! Надюсь вам все понравилось.",
              onConform: () => {
                dispatch(CLOSE_MODAL);
                navigate("/");
              },
              onCancel: () =>{
                dispatch(CLOSE_MODAL)
                navigate("/");
              },
            })
          );
    }, 25000)
  }, []);

  return (
    <div className={style.Delivery}>
      <div className={style.DeliveryText}>Доставка</div>
      {getOrder? <div className={style.DeliveryTextWrapper}>
        <div className={style.DeliveryText}>Заказ передан на кухню</div>
        {/* мигающая стрелка */}
      </div> : null}
      {orderInTransfer? <div className={style.DeliveryTextWrapper}>
        <div className={style.DeliveryText}>Заказ передан курьеру</div>
        {/* мигающая стрелка */}
      </div> : null}
      {orderDelivered? <div className={style.DeliveryTextWrapper}>
        <div className={style.DeliveryText}>заказ доставлен </div>
        {/* мигающая стрелка */}
      </div> : null}
    </div>
  );
};
