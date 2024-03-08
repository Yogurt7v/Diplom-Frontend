import style from "./left-header.module.css";
import Logo from "../../image/Logo2.png";
import { NavLink } from "react-router-dom";


export const LeftHeader =() => {
    return (
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
    )
}