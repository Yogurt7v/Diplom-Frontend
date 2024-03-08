import style from "./header.module.css";
import React from "react";
import exit from "../../../icons/exit.svg"
import NavMenu from "./nav-menu/nav-menu";
import Logo from "./image/Logo2.png";
import login from "./image/login.svg";
import registration from "./image/registration.svg";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../actions";

export const Header = () => {
  const loginName = useSelector((state) => state.user.login);
  const session = useSelector((state) => state.user.session);
  const dispatch = useDispatch();


  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem("userData");
  };

  return (
    <div className={style.HeaderWrapper}>
      <div className={style.LogoAndName}>
        <div className={style.HeaderLogoWrapper}>
          <NavLink to={"/"}>
            <img src={Logo} alt="logo" className={style.HeaderLogo} />
          </NavLink>
        </div>
        <div className={style.HeaderTitleWrapper}>
          <NavLink to={"/"}>
            <h1 className={style.HeaderTitle}>
              FastBurger <br></br> Fast & Delicious
            </h1>
          </NavLink>
        </div>
      </div>
      <div className={style.HeaderMenuWrapper}>
        <NavMenu />
      </div>
      {loginName ? (
        <div className={style.authWrapper}>
          <div className={style.HeaderAuth}> {loginName} </div>
          <button className={style.exitButton} onClick={onLogout}>
          <img src={exit}  className={style.HeaderExit} alt="exit button" />
          </button>
        </div>
      ) : (
        <div className={style.HeaderAuth}>
          <NavLink to={"/login"}>
            <img src={login} alt="Вход" className={style.HeaderLogin} />
          </NavLink>
          <NavLink to={"/register"}>
            <img src={registration} alt="Регистрация" className={style.HeaderRegistration}/>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
