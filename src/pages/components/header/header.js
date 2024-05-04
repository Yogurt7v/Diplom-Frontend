import style from "./header.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, clearBusketData } from "../../../actions";
import NavMenu from "./nav-menu/nav-menu";
import { LeftHeader } from "./nav-menu/left-header/left-header";
import { RightHeader } from "./nav-menu/right-header/right-header";

export const Header = ({onCategoryChange, isActiveItem, loading}) => {
  const loginName = useSelector((state) => state.user.login);
  const session = useSelector((state) => state.user.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  const onLogout = () => {
    dispatch(logout(session));
    localStorage.removeItem("userData");
    dispatch(clearBusketData())
    let currentURL = window.location.pathname;
    if (currentURL === "/admin-panel") {
      navigate("/");
    }
  };

  useEffect(() => {
    let currentURL = window.location.pathname;
    if (currentURL !== "/") {
      setVisible(false);
    }
  }, []);

  return (
    <div className={style.HeaderWrapper}>
      <LeftHeader loading={loading}/>
      <div className={style.HeaderMenuWrapper}>
        {visible? <NavMenu onCategoryChange={onCategoryChange} isActiveItem={isActiveItem}/> : null}
      </div>
      <RightHeader loginName={loginName} onLogout={onLogout} />
    </div>
  );
};

export default Header;
