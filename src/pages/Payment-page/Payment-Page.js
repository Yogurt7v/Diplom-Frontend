import style from "./payment-page.module.css";
import { Header } from "../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderByUserIdFetch } from "../../fetchs";
import { setBusketOrdersParams } from "../../fetchs/setBusketOrdersParams";
import { Delivery } from "../components";

export const PaymentPage = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [delivery, setDelivery] = useState(false);
  const [singleOrder, setSingleOrder] = useState(null);
  let count = 1;

  const singleOrderFuction = (id) => {
    return orders?.filter((order) => order._id === id);
  }


  const getCheckedOrders = (id) => {
    setDelivery(!delivery);
    setSingleOrder(singleOrderFuction(id));
    setBusketOrdersParams(id, true, false);
    setTimeout(() => {
      setBusketOrdersParams(id, true, true);
      setDelivery(!delivery);
    }, 21000);
  };
  useEffect(() => {
    getOrderByUserIdFetch(user.id).then((data) => setOrders(data));
  }, [getCheckedOrders]);

  return (
    <>
      <Header />
      <div className={style.PaymentPage}>
        {orders
          ?.filter((order) => order.paid === false)
          .map((order) => (
            <>
              <div className={style.Order}>
                  <div>Ваш заказ № {count++}</div>
                  <div>от {order.createdAt.split("T")[0]}{" "}{order.createdAt.split("T")[1].split(".")[0]}</div>
                <div className={style.OrderDetails}>
                  {order.items?.map((item) => (
                    <>
                      <div>
                        <div key={order.id}>
                          <label className={style.ItemDetails} f>
                            <div>{item.productName}</div>
                            <div>{item.quantity} шт.</div>
                            <div>{item.price} $</div>
                          </label>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              <button
                className={style.OrderButton}
                onClick={() => getCheckedOrders(order._id)}
              >
                Оплатить
              </button>
              <div>Представим, что здесь будет процесс оплаты.</div> 
              </div>
            </>
          ))}
        <div className={style.delyveryWrapper}>
          {delivery ? <Delivery singleOrder={singleOrder} /> : null}
        </div>
      </div>
    </>
  );
};
