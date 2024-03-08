import style from "./header.module.css";
import React from "react";
import NavMenu from "./nav-menu/nav-menu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../actions";
import { LeftHeader } from "./nav-menu/left-header/left-header";
import { RightHeader } from "./nav-menu/right-header/right-header";

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
      <LeftHeader />
      <div className={style.HeaderMenuWrapper}>
        <NavMenu />
      </div>
      <RightHeader loginName={loginName} onLogout={onLogout} />
    </div>
  );
};

export default Header;
