import style from "./busket.module.css";
import Header from "../components/header/header";
import trash from "../../icons/trash.svg";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectBusket, selectUserId } from "../../selectors";
import { VideoBackground } from "../components";
import {
  openModal,
  CLOSE_MODAL,
  clearBusketData,
  removeBusketData,
} from "../../actions";
import { addProductToBusketOperationFetch,getOrderByUserIdFetch, getPromocodeFetch, checkPromocodeFetch } from "../../fetchs";

export const Busket = () => {
  const dispatch = useDispatch();
  const userOnPage = useSelector(selectUserId);
  const user = useSelector(selectUserId);
  const busket = useSelector(selectBusket);
  const navigate = useNavigate();
  const [promocode, setPromocode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [userOrders, setUserOrders] = useState(null);
  const ref = useRef();

  const fetchUserOrders = async () => {
    const orders = await getOrderByUserIdFetch(user);
    setUserOrders(orders);
  };

  const checkPromocode = (code) => {
    checkPromocodeFetch(code).then((data) => setDiscount(data));
    ref.current.value = "";
  };

  const createNotification = () => {
    setTimeout(() => {
      const discount = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const { code } = await getPromocodeFetch();
          new Notification("Рады Вас видеть!", {
            body: `Промокод на скидку: ${code}`,
            icon: "https://grizly.club/uploads/posts/2023-01/1674322054_grizly-club-p-aktsiya-klipart-48.jpg",
            tag: "Сообщение",
            renotify: true,
          });
        }
      };
      discount();
    }, 1000);
  };

  useEffect(() => {
    fetchUserOrders();
    setDiscount(0);
  }, []);

  useEffect(() => {
    console.log("userOrders", userOrders);
      if (userOrders?.length === 0) {
        createNotification();
      }
  }, [fetchUserOrders]);

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
          setDiscount(0);
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
        {busket.items.length > 0 && (
          <div className={style.PromoWrapper}>
            <input
              className={style.BusketPromoInput}
              type="text"
              autoComplete="off"
              onChange={(e) => setPromocode(e.target.value)}
              ref={ref}
              placeholder="Промокод"
            />
            <button
              onClick={() => checkPromocode(promocode)}
              className={
                promocode.length > 0 ? style.OrderButton : style.Innactive
              }
            >
              {" "}
              Применить{" "}
            </button>
          </div>
        )}

        <div className={style.BusketCardSWrapper}>
          {busket.items.length > 0 ? (
            busket.items.map((item) => (
              <>
                <div className={style.BusketCard}>
                  <div key={item.id} className={style.BusketItemWrapper}>
                    <div className={style.BusketItem}>
                      Название: {item.productName}
                    </div>
                    <div>
                      Цена: {item.price - (item.price * discount) / 100} $
                    </div>
                    <div>Количество: {item.quantity}</div>
                    <div className={style.BusketItem}>
                      Итого:{" "}
                      {(item.price - (item.price * discount) / 100) *
                        item.quantity}{" "}
                      $
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
              (acc, item) =>
                acc +
                (item.price - (item.price * discount) / 100) * item.quantity,
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
