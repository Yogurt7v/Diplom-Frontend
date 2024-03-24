import style from "./busket.module.css";
import Header from "../components/header/header";
import trash from "../../icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectBusket, selectUserId } from "../../selectors";
import { removeBusketData } from "../../actions";
import { VideoBackground } from "../components";
import { Link } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { addProductToBusketAction } from "../../actions/add-product-to-busket";
import { openModal, CLOSE_MODAL, clearBusketData } from "../../actions";

export const Busket = () => {
  const dispatch = useDispatch();
  const userOnPage = useSelector(selectUserId);
  const busket = useSelector(selectBusket);
  const requestServer = useServerRequest();
  const navigate = useNavigate();

  const deleteItem = (randomId) => {
    dispatch(removeBusketData(randomId));
  };

  const createOrder = ({ items }) => {
    dispatch(addProductToBusketAction(requestServer, items, userOnPage));
    dispatch(
      openModal({
        text: "Заказ создан! Перейти к оплате?",
        onConform: () => {
          dispatch(CLOSE_MODAL);
          navigate("/payment");
        },
        onCancel: () => {
          dispatch(CLOSE_MODAL);
          navigate("/");
        },
      })
    );
    dispatch(clearBusketData())
  };


  return (
    <>
      <Header />
      <div className={style.BusketWrapper}>
        <h2 className={style.BusketTitle}>Заказ</h2>
        <div className={style.BusketCardSWrapper}>
          {busket.items.length > 0 ? (
            busket.items.map((item) => (
              <>
                <div className={style.BusketCard}>
                  <div key={item.id} className={style.BusketItemWrapper}>
                    <div className={style.BusketItem}>
                      Название: {item.productName}
                    </div>
                    <div>Цена: {item.price} $</div>
                    <div>Количество: {item.quantity}</div>
                    <div className={style.BusketItem}>
                      Итого: {item.price * item.quantity} $
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
              (acc, item) => acc + item.price * item.quantity,
              0
            )}{" "}
            $
          </div>
          {userOnPage === -1 ? (
            <div className={style.Login}>
            <Link to="/register" className={style.links}>Зарегестрироваться</Link>
            <Link to="/login"className={style.links}>Войти</Link>
            </div>
          ) : (
            <button
              className={busket.items.length>0 ? style.OrderButton : style.Innactive}
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
