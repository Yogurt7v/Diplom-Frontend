import style from "./Header.module.css";
import React from "react";
import NavMenu from "./nav-menu/NavMenu";
import Logo from "./image/logo-fotor-2024021112181.jpg";
import login from "./image/login.svg";
import registration from "./image/registration.svg";

export const Header = () => {
  return (
    <div className={style.HeaderWrapper}>
      <div className={style.LogoAndName}>
        <div className={style.HeaderLogoWrapper}>
          <img src={Logo} alt="logo" className={style.HeaderLogo} />
        </div>
        <div className={style.HeaderTitleWrapper}>
          <h1 className={style.HeaderTitle}>
            Вкусно <br></br> и быстро
          </h1>
        </div>
      </div>
      <div className={style.HeaderMenuWrapper}>
        <NavMenu />
      </div>

      <div className={style.HeaderAuth}>
        <img src={login} alt="" className={style.HeaderLogin} />
        <img src={registration} alt=""  className={style.HeaderRegistration}/>
      </div>
    </div>
  );
};

export default Header;
