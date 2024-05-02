import { useEffect } from "react";
import style from "./orders.module.css";

export const Orders = ({ users, orders, setPaidStatus, setDeliveryStatus, onBusketOrderUpdate, paidStatus, deliveryStatus,onBusketOrderDelete }) => {
  return (
    <>
      {users &&
        orders.map((order) => (
          <div className={style.Order} key={order._id}>
            <p>Заказ № : {order._id}</p>
            <p>
              Заказчик : {users.find((user) => user.id === order.userId)?.login}
            </p>
            <p>
              Адрес доставки :{" "}
              {users.find((user) => user.id === order.userId)?.address}
              ,
              {
                users.find((user) => user.id === order.userId)?.homeNumber
              }
              ,
              {
                users.find((user) => user.id === order.userId)?.flatNumber
              }
            </p>

            <p>
              Телефон : {users.find((user) => user.id === order.userId)?.phone}
            </p>

            {order.items?.map((item) => (
              <p>
                {item.productName} : {item.quantity} шт.
              </p>
            ))}

            <p> Сумма : {order.items?.reduce((accumulatedPrice, currentItem) => accumulatedPrice + currentItem.price * currentItem.quantity, 0)} $.</p>
            <div>
              Cтатус оплаты :{" "}
              <select
                className={style.OrderSelect}
                defaultValue={order.paid}
                onChange={(e) => setPaidStatus(e.target.value)}
              >
                <option value={true}>Оплачено</option>
                <option value={false}>Не оплачено</option>
              </select>
            </div>
            <div>
              Cтатус доставки :{" "}
              <select
                className={style.OrderSelect}
                defaultValue={order.delivered}
                onChange={(e) => setDeliveryStatus(e.target.value)}
              >
                <option value={true}>Доставлено</option>
                <option value={false}>Не доставлено</option>
              </select>
            </div>


            <button
              className={style.SaveButton}
              onClick={() =>
                onBusketOrderUpdate({
                  id: order._id,
                  paid: paidStatus,
                  delivery: deliveryStatus,
                })
              }
            >
              Сохранить
            </button>
                        <button
              className={style.SaveButton}
              onClick={() =>
                onBusketOrderDelete(order._id)
              }
            >
              удалить
            </button>
          </div>
        ))}
    </>
  );
};
