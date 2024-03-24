import style from "./orders.module.css";

export const Orders = ({ users, orders, setPaidStatus, setDeliveryStatus, onBusketOrderUpdate, paidStatus, deliveryStatus }) => {
  return (
    <>
      {users &&
        orders.map((order) => (
          <div className={style.Order} key={order.id}>
            <p>Заказ № : {order.id}</p>
            <p>
              Заказчик : {users.find((user) => user.id === order.userId)?.login}
            </p>
            <p>
              Адрес доставки :{" "}
              {users.find((user) => user.id === order.userId)?.location.address}
              ,
              {
                users.find((user) => user.id === order.userId)?.location
                  .homeNumber
              }
              ,
              {
                users.find((user) => user.id === order.userId)?.location
                  .flatNumber
              }
            </p>

            <p>
              Телефон : {users.find((user) => user.id === order.userId)?.phone}
            </p>

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
                  id: order.id,
                  paid: paidStatus,
                  delivery: deliveryStatus,
                })
              }
            >
              Save
            </button>
          </div>
        ))}
    </>
  );
};
