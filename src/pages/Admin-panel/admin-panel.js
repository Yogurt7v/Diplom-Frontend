import style from "./admin-panel.module.css";
import { useState } from "react";
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
import { Header, Orders } from "../components";
import {getUsersFetch} from "../../fetchs/getUsers";
import {getRolesFetch} from "../../fetchs/getRoles";
import  {getOrdersFetch} from "../../fetchs/getOrders";
import {removeUserFetch} from "../../fetchs/removeUser";
import { useCallback } from "react";

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
  const [paidStatus, setPaidStatus] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const requestServer = useServerRequest();

  const onUserRemove = useCallback((userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      setErrorMessage("Доступ запрещен");
      return;
    }
    const user = users.find((user) => user.id === userId);

    if (user.roleId === 0){
      setErrorMessage("Нельзя удалить администратора");
      return;
    }
      setErrorMessage(null);
      removeUserFetch(userId).then(() => {
        setShouldUpdateUserList(!shouldUpdateUserList);
      });
    })

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

  useLayoutEffect(() => {
    if (!checkAccess([ROLE.ADMIN, ROLE.MODERATOR], userRole)) {
      setErrorMessage("Доступ запрещен ");
      return;
    }
    Promise.all([
    getUsersFetch(),
    getRolesFetch(),
    // getOrdersFetch()
  ]).then(([usersRes, rolesRes, ordersRes]) => {
    if (usersRes.error || rolesRes.error) {
      setErrorMessage(usersRes.error || rolesRes.error);
      return;
    }

    // Promise.all([
    //   requestServer(`fetchUsers`),
    //   requestServer(`fetchRoles`),
    //   requestServer(`fetchOrders`),
    // ]).then(([usersRes, rolesRes, ordersRes]) => {
    //   if (usersRes.error || rolesRes.error) {
    //     setErrorMessage(usersRes.error || rolesRes.error);
    //     return;
    //   }

      setUsers(usersRes);
      setRole(rolesRes.res);
      // setOrders(ordersRes.res);
    });
  }, [requestServer, shouldUpdateUserList, userRole, onUserRemove, setErrorMessage, errorMessage]);





  const onBusketOrderUpdate = (objParams) => {
    requestServer(`updateBusketOrders`, objParams);
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
              <PrivateEditForm product={newProduct} />
          </details>
        ) : null}
        {userRole === ROLE.ADMIN ? (
          <details className={style.AdminPanelDetails}>
            <summary className={style.AdminPanelSummary}>Пользователи</summary>
            {errorMessage ? <div >{errorMessage}</div> : null}
            {/* <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}> */}
              <div>
                {users.map(
                  ({ id, login, address,homeNumber,flatNumber, phone, registed_at, roleId }) => (
                    <UserRow
                      key={id}
                      id={id}
                      login={login}
                      address={address}
                      homeNumber={homeNumber}
                      flatNumber={flatNumber}
                      phone={phone}
                      registed_at={registed_at}
                      roleId={roleId}
                      roles={role.filter(
                        ({ id: role_id }) => role_id !== ROLE.GUEST
                      )}
                      onUserRemove={() => onUserRemove(id)}
                    />
                  )
                )}
              </div>
            {/* </PrivateContent> */}
          </details>
        ) : null}

        {userRole === ROLE.ADMIN || userRole === ROLE.MODERATOR ? (
          <details>
            <summary className={style.AdminPanelSummary}>Заказы</summary>
            <div className={style.OrdersWrapper}>
              <Orders users={users} orders={orders} setPaidStatus={setPaidStatus} setDeliveryStatus={setDeliveryStatus} onBusketOrderUpdate={onBusketOrderUpdate} paidStatus={paidStatus} deliveryStatus={deliveryStatus}/>
            </div>
          </details>
        ) : null}
      </div>
    </>
  );
};
