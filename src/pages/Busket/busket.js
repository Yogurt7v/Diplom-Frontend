import style from "./busket.module.css";
import Header from "../components/header/header";
import trash from "../../icons/trash.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectBusket, selectUserId } from "../../selectors";
import { removeBusketData } from "../../actions";
import { VideoBackground } from "../components";
import { Link } from "react-router-dom";
import { addProductToBusket } from "../../Bff/api/add-product-to-busket";
import { useServerRequest } from "../../hooks";

export const Busket = () => {
  const dispatch = useDispatch();
  const userOnPage = useSelector(selectUserId);
  const busket = useSelector(selectBusket);
  const requestServer = useServerRequest();

  const deleteItem = (randomId) => {
    dispatch(removeBusketData(randomId));
  };

  const createOrder = ({ items }) => {
    items.forEach(({ userId, productId, productName, quantity, price }) => {
      console.log(userId, productId, productName, quantity, price);
      dispatch(
        addProductToBusket(
          requestServer,
          userId,
          productId,
          productName,
          quantity,
          price
        )
      );
    });
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
            <Link to="/register">Зарегестрироваться</Link>
          ) : (
            <button
              className={busket.length > 0 ? style.OrderButton : style.Innactive}
              onClick={() => createOrder(busket)}
            >
              Оформить
            </button>
          )}
        </div>
      </div>
      <VideoBackground />
    </>
  );
};

export default Busket;
