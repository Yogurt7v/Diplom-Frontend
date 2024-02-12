import style from "./Header.module.css";
import React from "react";
import NavMenu from "./nav-menu/NavMenu";
import Logo from "./image/Logo2.png";
import login from "./image/login.svg";
import registration from "./image/registration.svg";
import { NavLink } from "react-router-dom";

export const Header = () => {
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
      <div className={style.HeaderAuth}>
        <NavLink to={"/login"}><img src={login} alt="Вход" className={style.HeaderLogin} /></NavLink>
        <img src={registration} alt="Регистрация"  className={style.HeaderRegistration}/>
      </div>
    </div>
  );
};

export default Header;
