import style from "./busket.module.css";
import Header from "../components/header/header";
import trash from "../../icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectBusket, selectUserId } from "../../selectors";
import { removeBusketData } from "../../actions";
import { VideoBackground } from "../components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { openModal, CLOSE_MODAL, clearBusketData } from "../../actions";
import { addProductToBusketOperationFetch } from "../../fetchs/addToBusket";
import { useEffect, useRef } from "react";
import { getOrderByUserIdFetch } from "../../fetchs/getOrderByUserId";
import { useState } from "react";
import { getPromocodeFetch } from "../../fetchs/getPromocode";
import { checkPromocodeFetch } from "../../fetchs/checkPromocode";

export const Busket = () => {
  const dispatch = useDispatch();
  const userOnPage = useSelector(selectUserId);
  const user = useSelector(selectUserId);
  const busket = useSelector(selectBusket);
  const navigate = useNavigate();
  const [userOrders, setUserOrders] = useState([]);
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(0);
  const ref = useRef();

  const checkPromocode = (code) => {
    checkPromocodeFetch(code).then((data) => setDiscount(data));
    ref.current.value = "";
  }
  

  useEffect(() => {
    if (!user) {
      return;
    }else {
      getOrderByUserIdFetch(user).then((data) => setUserOrders(data));
      setDiscount(0)
    }
  }, [user]);

  console.log(userOrders);

  useEffect(() => {
    if (userOrders?.length === 0) {
      setTimeout(() => {
        const discount = async() =>{
          const permission = await Notification.requestPermission();
          const {code} = await getPromocodeFetch()
          if (permission === "granted" ) {
            new Notification("Делаете свой первый заказ?", {
              body: `Промокод: ${code}`,
              icon: "https://grizly.club/uploads/posts/2023-01/1674322054_grizly-club-p-aktsiya-klipart-48.jpg",
              tag: "Сообщение",
              renotify: true,
            })
        }
        }
        discount()
        },1000)
      }
      else {
        return
      }

      // const discount = async() =>{
      //   const permission = await Notification.requestPermission();
      //   const {code} = await getPromocodeFetch()
      //   if (permission === "granted") {
      //     new Notification("Делаете свой первый заказ?", {
      //       body: `Промокод: ${code}`,
      //       icon: "https://grizly.club/uploads/posts/2023-01/1674322054_grizly-club-p-aktsiya-klipart-48.jpg",
      //       tag: "Сообщение",
      //       renotify: true,
      //     })
      // }
      // }
  }, [setUserOrders]);


  const deleteItem = (randomId) => {
    dispatch(removeBusketData(randomId));
  };

  const createOrder = ({ items }) => {
    addProductToBusketOperationFetch(userOnPage, items);
    dispatch(
      openModal({
        text: "Заказ создан! Перейти к оплате?",
        onConform: () => {
          dispatch(CLOSE_MODAL);
          setDiscount(0)
          navigate("/payment");
        },
        onCancel: () => {
          dispatch(CLOSE_MODAL);
          navigate("/");
        },
      })
    );
    dispatch(clearBusketData());
  };

  return (
    <>
      <Header />
      <div className={style.BusketWrapper}>
        <h2 className={style.BusketTitle}>Заказ</h2>
        <div className={style.PromoWrapper}>
        <input className={style.BusketPromoInput} type="text" autoComplete="off" onChange={(e) => setPromocode(e.target.value)} ref={ref} placeholder="Промокод" />
        <button  onClick={() => checkPromocode(promocode)}               className={
                promocode.length > 0 ? style.OrderButton : style.Innactive
              }> Применить </button>
        </div>
        <div className={style.BusketCardSWrapper}>
          {busket.items.length > 0 ? (
            busket.items.map((item) => (
              <>
                <div className={style.BusketCard}>
                  <div key={item.id} className={style.BusketItemWrapper}>
                    <div className={style.BusketItem}>
                      Название: {item.productName}
                    </div>
                    <div>Цена: {item.price - item.price * discount / 100 } $</div>
                    <div>Количество: {item.quantity}</div>
                    <div className={style.BusketItem}>
                      Итого: {(item.price - item.price * discount / 100 ) * item.quantity } $
                    </div>
                  </div>
                  <div onClick={() => deleteItem(item.randomId)}>
                    <img
                      src={trash}
                      alt="delete"
                      className={style.BusketButton}
                    />
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className={style.BusketEmpty}>Корзина пуста</div>
          )}
        </div>
        <div className={style.BusketSumWrapper}>
          <div className={style.BusketSum}>
            Итого:{" "}
            {busket.items.reduce(
              (acc, item) => acc + (item.price - item.price * discount / 100 ) * item.quantity,
              0
            )}{" "}
            $
          </div>
          {userOnPage === -1 ? (
            <div className={style.Login}>
              <Link to="/register" className={style.links}>
                Зарегестрироваться
              </Link>
              <Link to="/login" className={style.links}>
                Войти
              </Link>
            </div>
          ) : (
            <button
              className={
                busket.items.length > 0 ? style.OrderButton : style.Innactive
              }
              onClick={() => createOrder(busket)}
            >
              Оформить
            </button>
          )}
        </div>

        <div className={style.BackButton}>
          <button className={style.OrderButton} onClick={() => navigate("/")}>
            Назад
          </button>
        </div>
      </div>
      <VideoBackground />
    </>
  );
};

export default Busket;
