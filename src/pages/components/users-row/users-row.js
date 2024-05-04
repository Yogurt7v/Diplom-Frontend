import style from "./users-row.module.css";
import save from "../../../icons/save.svg";
import trash from "../../../icons//trash.svg";
import { useState } from "react";
import { useServerRequest } from "../../../hooks";
import { updateUserRoleFetch } from "../../../fetchs/updateUserRole";

export const UserRow = ({
  id,
  login,
  address,
  homeNumber,
  flatNumber,
  phone,
  registed_at,
  roles,
  roleId,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(roleId);
  const [selectedRoleId, setSelectedRoleId] = useState(roleId);
  const requestServer = useServerRequest();

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (userId, newUserRoleId) => {
    updateUserRoleFetch(userId, newUserRoleId).then(() => {
      setInitialRoleId(newUserRoleId);
    });
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;
  return (
    <>
      <div className={style.userRow}>
        <div className={style.usersWrapper}>
          <div className={style.userLogin}>Login: {login}</div>
          <div className={style.userLogin}>Address: {address}</div>
          <div className={style.userLogin}>№: {homeNumber}</div>
          <div className={style.userLogin}>Flat: {flatNumber}</div>
          <div className={style.userLogin}>Telephone: {phone}</div>
          <div className={style.userRegisterDate}>
            Date registration: {registed_at}
          </div>
          <div className={style.userRole}>
            <select defaultValue={selectedRoleId} onChange={onRoleChange} className={style.RoleSelect}>
              {roles.map(({ id: roleId, name: roleName }) => (
                <option key={roleId} defaultValue={roleId}>
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
          <div className={style.deleteButtonWrapper}>
            <img
              src={trash}
              alt="trash"
              className={style.deleteButton}
              onClick={onUserRemove}
            />
          </div>
        </div>
      </div>
    </>
  );
};
