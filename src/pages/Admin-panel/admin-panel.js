import style from "./admin-panel.module.css";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {useServerRequest} from '../../hooks';
import {selectUserRole} from '../../selectors';
import {checkAccess} from '../../utils';
import {ROLE} from '../../constants/role';
import {PrivateContent} from '../components/private-content/';
import {UserRow} from '../components/users-row/users-row';

export const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [role, setRole] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
    const userRole = useSelector(selectUserRole);

    const requestServer = useServerRequest();

    useEffect(() => {
        if (!checkAccess([ROLE.ADMIN], userRole)) {
          setErrorMessage("Доступ запрещен ");
          return;
        }
    
        Promise.all([
          requestServer(`fetchUsers`),
          requestServer(`fetchRoles`),
        ]).then(([usersRes, rolesRes]) => {

          if (usersRes.error || rolesRes.error) {
            setErrorMessage(usersRes.error || rolesRes.error);
            return;
          }
    
          setUsers(usersRes.res);
          setRole(rolesRes.res);
        });
      }, [requestServer, shouldUpdateUserList, userRole]);

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
    <div className={style.AdminPanelWrapper}>
    <details>
        <summary className={style.AdminPanelSummary}>Добавить новый продукт</summary>
        <div>здесь будет форма добавления продукта</div>
    </details>
    <details>
        <summary className={style.AdminPanelSummary}>Пользователи</summary>
        <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
        <div>
          <h2>Пользователи</h2>
            {users.map(({ id, login, location, phone, registed_at,  role_id }) => (
              <UserRow
                key={id}
                id={id}
                login={login}
                adress={location.adress}
                homeNumber = {location.homeNumber}
                flatNumber = {location.flatNumber}
                phone={phone}
                registed_at={registed_at}
                role_id={role_id}
                roles={role.filter(({ id: role_id }) => role_id !== ROLE.GUEST)}
                onUserRemove={() => onUserRemove(id)}
              />
            ))}
        </div>
      </PrivateContent>
    </details>
    </div>
    </>
  )
};
