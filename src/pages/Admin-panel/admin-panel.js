import style from "./admin-panel.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { checkAccess } from "../../utils";
import { UserRow } from "../components";
import { PrivateEditForm } from "../Product-Page/private-edit-form.js";
import { setUser } from "../../actions";
import { useLayoutEffect,useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Header, Orders, Reports } from "../components";
import {getUsersFetch, getRolesFetch, getOrdersFetch, removeUserFetch, updateBusketOrdersFetch, deleteBusketOrderFetch, getReportsFetch, deleteReportFetch} from "../../fetchs";
import { CLOSE_MODAL, openModal } from "../../actions";

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
  const [reports, setReports] = useState([]);
  const [reportDeleteMessage , setReportDeleteMessage] = useState(null);
  const [ordersDeleteMessage , setOrdersDeleteMessage] = useState(null);

  
  const onBusketOrderUpdate = (objParams) => {
    updateBusketOrdersFetch(objParams);
  };


  const onBusketOrderDelete = (id) => {  
    dispatch(
      openModal({
        text: "Удалить заказ? ",
        onConform: () => {
          dispatch(CLOSE_MODAL);
          deleteBusketOrderFetch(id);
          setOrders(orders.filter((order) => order._id !== id));
          setOrdersDeleteMessage("Заказ удален");
          setTimeout(() => {
            setOrdersDeleteMessage(null);
          }, 3000)
        },
        onCancel: () => {
          dispatch(CLOSE_MODAL);
        },
      })
    );

  };
  const deleteReport = (id) => {

    dispatch(
      openModal({
        text: "Удалить жалобу? ",
        onConform: () => {
          dispatch(CLOSE_MODAL);
          setReportDeleteMessage("Жалоба удалена");
          setReports(reports.filter((report) => report._id !== id));
          deleteReportFetch(id);
          setTimeout(() => {
            setReportDeleteMessage(null);
          }, 3000)
        },
        onCancel: () => {
          dispatch(CLOSE_MODAL);
        },
      })
    );
  };


  const onUserRemove = useCallback((userId) => {
    if (!checkAccess([role[0]?.id], userRole)) {
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
        setUsers(users.filter((user) => user.id !== userId));
        setShouldUpdateUserList(!shouldUpdateUserList);

      });
    }, [role, shouldUpdateUserList,userRole, users]);

  useLayoutEffect(() => {
    const currentUserDataJSON = localStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);
    dispatch(
      setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) })
    );


  }, [ dispatch ]);

  useEffect(() => {
    Promise.all([
      getUsersFetch(),
      getRolesFetch(),
      getOrdersFetch(),
      getReportsFetch()
    ]).then(([usersRes, rolesRes, ordersRes, reportsRes]) => {
      setUsers(usersRes);
      setRole(rolesRes);
      setOrders(ordersRes);
      setReports(reportsRes);
    });
  }, []);

  return (
    <>
      <Header />
      <div className={style.AdminPanelWrapper}>
        {userRole === role[0]?.id|| userRole === role[0]?.id? (
          <details className={style.AdminPanelDetails}>
            <summary className={style.AdminPanelSummary}>
              Добавить новый продукт
            </summary>
              <PrivateEditForm product={newProduct} />
          </details>
        ) : null}
        {userRole === role[0]?.id || userRole === role[1]?.id  ? (
          <details className={style.AdminPanelDetails}>
            <summary className={style.AdminPanelSummary}>Пользователи</summary>
            {errorMessage ? <div >{errorMessage}</div> : null}
              <div>
                {users?.map(
                  ({ id, login, address ,homeNumber,flatNumber, phone, registeredAt, roleId }) => (
                    <UserRow
                      key={id}
                      id={id}
                      login={login}
                      address={address}
                      homeNumber={homeNumber}
                      flatNumber={flatNumber}
                      phone={phone}
                      registeredAt={registeredAt}
                      roleId={roleId}
                      roles={role.filter(
                        ({ id: role_id }) => role_id !== role[3]?.id
                      )}
                      onUserRemove={() => onUserRemove(id)}
                    />
                  )
                )}
              </div>
          </details>
        ) : null}

        {orders.length > 0 && (userRole === role[0]?.id || userRole === role[1]?.id) ? (
          <details>
            <summary className={style.AdminPanelSummary}>Заказы</summary>
            <div className={style.userMessage}>{ordersDeleteMessage}</div>
            <div className={style.OrdersWrapper}>
              <Orders users={users} orders={orders} setPaidStatus={setPaidStatus} setDeliveryStatus={setDeliveryStatus} onBusketOrderUpdate={onBusketOrderUpdate} paidStatus={paidStatus} deliveryStatus={deliveryStatus} onBusketOrderDelete={onBusketOrderDelete}/>
            </div>
          </details>
        ) : null}

        {reports.length > 0  && (userRole === role[0]?.id|| userRole === role[1]?.id) ? (
            <details>
            <div className={style.userMessage}>{reportDeleteMessage}</div>
            <summary className={style.AdminPanelSummary}>Жалобы</summary>
               <Reports users={users} reports={reports} deleteReport={deleteReport}/>
            </details>
        ) : null}
      </div>
    </>
  );
};
