import { useEffect, useState } from "react";
import style from "./delivery.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal, CLOSE_MODAL } from "../../../actions";
import deliveryIcon from "../../../icons/delivery.svg";

export const Delivery = ({ singleOrder }) => {
  const [getOrder, setOrder] = useState(false);
  const [orderInTransfer, setOrderInTransfer] = useState(false);
  const [orderDelivered, setOrderDelivered] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const now = () => setDeliveryTime(new Date().toLocaleString("ru-RU"));

  useEffect(() => {
    setTimeout(() => {
      setOrder(true);
    }, 7000);
    setTimeout(() => {
      setOrderInTransfer(true);
    }, 14000);
    setTimeout(() => {
      now();
      setOrderDelivered(true);
    }, 21000);
    setTimeout (() => {
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
    }, 25000);
  }, []);

  return (

    <section>
      <figure>
        <img src={deliveryIcon} alt="" />
        <figcaption>
          <div className={style.DeliveryText}>Доставка</div>
          <h6>
            Заказ от {singleOrder[0].createdAt.split("T")[1].split(".")[0]}
          </h6>

          <h2>****{singleOrder[0]._id.slice(-6)}</h2>
        </figcaption>
      </figure>
      <div className={style.orderTrack}>
        {getOrder ? (
          <div className={style.orderTrackStep}>
            <div className={style.orderTrackStatus}>
              <span className={style.orderTrackStatusDot}></span>
              <span className={style.orderTrackStatusLine}></span>
            </div>
            <div className={style.orderTrackText}>
              <p className={style.orderTrackTextStat}>Заказ передан на кухню</p>
              <span className={style.orderTrackTextSub}>Мы стараемся ради Вас</span>
            </div>
          </div>
        ) : null}
        {orderInTransfer ? (
          <div className={style.orderTrackStep}>
            <div className={style.orderTrackStatus}>
              <span className={style.orderTrackStatusDot}></span>
              <span className={style.orderTrackStatusLine}></span>
            </div>
            <div className={style.orderTrackText}>
              <p className={style.orderTrackTextStat}>Заказ у курьера</p>
              <span className={style.orderTrackTextSub}>
                Передан в заботливые руки
              </span>
            </div>
          </div>
        ) : null}
        {orderDelivered ? (
          <div className={style.orderTrackStep}>
            <div className={style.orderTrackStatus}>
              <span className={style.orderTrackStatusDot}></span>
              <span className={style.orderTrackStatusLine}></span>
            </div>
            <div className={style.orderTrackText}>
              <p className={style.orderTrackTextStat}> Заказ доставлен</p>
              <span className={style.orderTrackTextSub}>{deliveryTime}</span>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};
