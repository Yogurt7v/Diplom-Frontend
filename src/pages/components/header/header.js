import style from "./header.module.css";
import React, { useEffect } from "react";
import NavMenu from "./nav-menu/nav-menu";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../actions";
import { LeftHeader } from "./nav-menu/left-header/left-header";
import { RightHeader } from "./nav-menu/right-header/right-header";
import { clearBusketData } from "../../../actions";
import { useState } from "react";

export const Header = ({onCategoryChange, isActiveItem}) => {
  const loginName = useSelector((state) => state.user.login);
  const session = useSelector((state) => state.user.session);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  const onLogout = () => {
    dispatch(logout(session));
    sessionStorage.removeItem("userData");
    dispatch(clearBusketData())
  };

  useEffect(() => {
    let currentURL = window.location.href;
    if (currentURL !== "http://localhost:3000/") {
    setVisible(false);
  }
  }, []);

  return (
    <div className={style.HeaderWrapper}>
      <LeftHeader />
      <div className={style.HeaderMenuWrapper}>
        {visible? <NavMenu onCategoryChange={onCategoryChange} isActiveItem={isActiveItem}/> : null}
      </div>
      <RightHeader loginName={loginName} onLogout={onLogout} />
    </div>
  );
};

export default Header;
