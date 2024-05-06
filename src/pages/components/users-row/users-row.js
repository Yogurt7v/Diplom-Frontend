import style from "./users-row.module.css";
import save from "../../../icons/save.svg";
import trash from "../../../icons//trash.svg";
import { useState } from "react";
import { updateUserUpdateFetch } from "../../../fetchs/updateUserRole";

export const UserRow = ({
  id,
  login,
  address,
  homeNumber,
  flatNumber,
  phone,
  registeredAt,
  roles,
  roleId,
  onUserRemove,
}) => {
  const [initialRoleId, setInitialRoleId] = useState(roleId);
  const [selectedRoleId, setSelectedRoleId] = useState(roleId);
  const [message, setMessage] = useState("");
  const [newAddress, setNewAddress] = useState(address);
  const [newHomeNumber, setNewHomeNumber] = useState(homeNumber);
  const [newFlatNumber, setNewFlatNumber] = useState(flatNumber);
  const [newPhone, setNewPhone] = useState(phone);

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  };

  const onRoleSave = (
    userId,
    newUserRoleId,
    newAddress,
    newHomeNumber,
    newFlatNumber,
    newPhone
  ) => {
    setMessage(`${login} был обновлен`);
    updateUserUpdateFetch(
      userId,
      newUserRoleId,
      newAddress,
      newHomeNumber,
      newFlatNumber,
      newPhone
    ).then(() => {
      setInitialRoleId(newUserRoleId);
    });
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;
  return (
    <>
      <div className={style.userRow}>
        <div className={style.usersWrapper}>
          <div className={style.userLogin}>
            Login: {login} <span className={style.userMessage}>{message}</span>
          </div>
          <div className={style.userInputWrapper}>
            <div className={style.userLogin}>
              Address:{" "}
              <input
                className={style.userInput}
                defaultValue={address}
                type="text"
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
            <div className={style.userLogin}>
              №:{" "}
              <input
                className={style.userInput}
                type="number"
                defaultValue={homeNumber}
                onChange={(e) => setNewHomeNumber(e.target.value)}
              />
            </div>
            <div className={style.userLogin}>
              Flat:{" "}
              <input
                className={style.userInput}
                type="number"
                defaultValue={flatNumber}
                onChange={(e) => setNewFlatNumber(e.target.value)}
              />
            </div>
            <div className={style.userLogin}>
              Telephone:{" "}
              <input
                className={style.userInputPhone}
                defaultValue={phone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
          </div>
          <div className={style.userRegisterDateWrapper}>
            <div className={style.userRegisterDate}>
              Date registration:
              <div className={style.userLogin}>
                {registeredAt.split("T")[0]}
              </div>
            </div>
            <div className={style.userRole}>
              <select
                value={selectedRoleId}
                onChange={onRoleChange}
                className={style.RoleSelect}
              >
                {roles.map(({ id: roleId, name: roleName }) => (
                  <option key={roleId} value={roleId}>
                    {roleName}
                  </option>
                ))}
              </select>
            </div>

            <div className={style.buttonsWrapper}>
              <div className={style.deleteButtonWrapper}>
                <img
                  src={save}
                  alt="save"
                  className={style.saveButton}
                  onClick={() =>
                    onRoleSave(
                      id,
                      selectedRoleId,
                      newAddress,
                      newHomeNumber,
                      newFlatNumber,
                      newPhone
                    )
                  }
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
        </div>
      </div>
    </>
  );
};
