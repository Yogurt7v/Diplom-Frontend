import style from "./Header.module.css";
import React from "react";

export const Header = () => {
  return (
    <div className={style.HeaderWrapper}>
      <div className={style.HeaderLogo}></div>

      <div className={style.HeaderMenu}></div>

      <div className={style.HeaderAuth}></div>
    </div>
  );
};

export default Header;
