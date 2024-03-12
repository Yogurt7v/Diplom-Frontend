import style from "./users-row.module.css";
import save from "../../../icons/save.svg";
import trash from "../../../icons//trash.svg";
import { useState } from "react";
import { useServerRequest } from "../../../hooks";

export const UserRow = ({
  id,
  login,
  adress,
  homeNumber,
  flatNumber,
  phone,
  registed_at,
  roles,
  role_id,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(role_id);
  const [selectedRoleId, setSelectedRoleId] = useState(role_id);
  const requestServer = useServerRequest();

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    requestServer(`updateUserRole`, userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  return (
    <>
      <div>
        <div className={style.usersWrapper}>
          <div className={style.userLogin}>Login: {login}</div>
          <div className={style.userLogin}>Adress: {adress}</div>
          <div className={style.userLogin}>№: {homeNumber}</div>
          <div className={style.userLogin}>Flat: {flatNumber}</div>
          <div className={style.userLogin}>Telephone: {phone}</div>
          <div className={style.userRegisterDate}>Date registration: {registed_at}</div>
          <div className={style.userRole}>
            <select value={selectedRoleId} onChange={onRoleChange}>
              {roles.map(({ id: roleId, name: roleName }) => (
                <option key={roleId} value={roleId}>
                  {roleName}
                </option>
              ))}
            </select>
            <img
              src={save}
              alt="save"
              className={style.saveButton}
              onClick={() => onRoleSave(id, selectedRoleId)}
              disabled={isSaveButtonDisabled}
            />
          </div>
          <img
            src={trash}
            alt="trash"
            className={style.deleteButton}
            onClick={onUserRemove}
          />
        </div>
      </div>
    </>
  );
};
