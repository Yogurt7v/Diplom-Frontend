import style from "./right-header.module.css";
import { NavLink } from "react-router-dom";
import exit from "../../../../../icons/exit.svg";
import login from "../../image/login.svg";
import registration from "../../image/registration.svg";
import admin from "../../image/admin-panel.svg";
import { useSelector } from "react-redux";

export const RightHeader =( {loginName, onLogout}) => {

  const userRoleId = useSelector((state) => state.user.roleId);
  const access = () =>{
    if (userRoleId === 0 || userRoleId === 1) {
      return true;
    }
  } 

    return (
        <>
        {loginName && loginName!=="guest"? (
            <div className={style.authWrapper}>
              <div className={style.HeaderAuth}> {loginName} </div>
              {access && <NavLink to={"/admin-panel"} className={style.newProduct}>
                 <img src={admin} alt="Добавить продукт" className={style.HeaderAdd} />
                </NavLink>}
              <button className={style.exitButton} onClick={onLogout}>
                <img src={exit} className={style.HeaderExit} alt="exit button" />
              </button>
            </div>
          ) : (
            <div className={style.HeaderAuth}>
              <NavLink to={"/login"}>
                <img src={login} alt="Вход" className={style.HeaderLogin} />
              </NavLink>
              <NavLink to={"/register"}>
                <img
                  src={registration}
                  alt="Регистрация"
                  className={style.HeaderRegistration}
                />
              </NavLink>
            </div>
          )}
          </>
    )
}