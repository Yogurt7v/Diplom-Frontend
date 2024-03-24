import style from "./admin-panel.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useServerRequest } from "../../hooks";
import { selectUserRole } from "../../selectors";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants/role";
import { PrivateContent } from "../components/private-content/";
import { UserRow } from "../components/users-row/users-row";
import { PrivateEditForm } from "../Product-Page/private-edit-form.js";
import { setUser } from "../../actions";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "../components";

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
  const userRole = useSelector(selectUserRole);
  const newProduct = {
    id: "",
    productName: "",
    image_url: "",
    description: "",
    category: "",
    weight: "",
    calories: "",
    ingredients: "",
    price: "",
    comments: [],
  };
  const [orders, setOrders] = useState([]);

  const requestServer = useServerRequest();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)) {
      setErrorMessage("Доступ запрещен ");
      return;
    }

    Promise.all([
      requestServer(`fetchUsers`),
      requestServer(`fetchRoles`),
      requestServer(`fetchOrders`),
    ]).then(([usersRes, rolesRes, ordersRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }

      setUsers(usersRes.res);
      setRole(rolesRes.res);
      setOrders(ordersRes.res);
    });
  }, [requestServer, shouldUpdateUserList, userRole, orders]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      setErrorMessage("Доступ запрещен");
      return;
    }

    requestServer(`removeUser`, userId).then(() => {
      setShouldUpdateUserList(!shouldUpdateUserList);
    });
  };

  return (
    <>
      <Header />
      <div className={style.AdminPanelWrapper}>
        {userRole === ROLE.ADMIN || userRole === ROLE.MODERATOR ? (
          <details className={style.AdminPanelDetails}>
            <summary className={style.AdminPanelSummary}>
              Добавить новый продукт
            </summary>
            <div>
              <PrivateEditForm product={newProduct} />
            </div>
          </details>
        ) : null}
        {userRole === ROLE.ADMIN ? (
          <details className={style.AdminPanelDetails}>
            <summary className={style.AdminPanelSummary}>Пользователи</summary>
            <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
              <div>
                <h2>Пользователи</h2>
                {users.map(
                  ({ id, login, location, phone, registed_at, role_id }) => (
                    <UserRow
                      key={id}
                      id={id}
                      login={login}
                      address={location.address}
                      homeNumber={location.homeNumber}
                      flatNumber={location.flatNumber}
                      phone={phone}
                      registed_at={registed_at}
                      role_id={role_id}
                      roles={role.filter(
                        ({ id: role_id }) => role_id !== ROLE.GUEST
                      )}
                      onUserRemove={() => onUserRemove(id)}
                    />
                  )
                )}
              </div>
            </PrivateContent>
          </details>
        ) : null}

        {userRole === ROLE.ADMIN || userRole === ROLE.MODERATOR ? (
          <details>
            <summary className={style.AdminPanelSummary}>Заказы</summary>
            <div className={style.OrdersWrapper}>
              {users &&
                orders.map((order) => (
                  <div className={style.Order} key={order.id}>
                    <p>Заказ № : {order.id}</p>
                    <p>
                      Заказчик :{" "}
                      {users.find((user) => user.id === order.userId)?.login}
                    </p>
                    <p>
                      Адрес доставки :{" "}
                      {
                        users.find((user) => user.id === order.userId)?.location
                          .address
                      }
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
                      Телефон :{" "}
                      {users.find((user) => user.id === order.userId)?.phone}
                    </p>
                    <p>
                      Статус оплаты : {order.paid ? "Оплачено" : "Не оплачено"}
                    </p>
                    <p>
                      Статус доставки :{" "}
                      {order.delivered ? "Доставлено" : "Не доставлено"}
                    </p>
                  </div>
                ))}
            </div>
          </details>
        ) : null}
      </div>
    </>
  );
};
