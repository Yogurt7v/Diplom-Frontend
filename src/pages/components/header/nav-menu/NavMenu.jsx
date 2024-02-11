import style from "./NavMenu.module.css";

export const NavMenu = () => {
  return (
    <>
     <nav className={style.NavMenuWrapper}>
        <div className={style.NavMenuItem}>Burgers</div>
        <div className={style.NavMenuItem}>Salats</div>
        <div className={style.NavMenuItem}>Snacks</div>
        <div className={style.NavMenuItem}>Drinks</div>
     </nav>
    </>
  );
};

export default NavMenu;
