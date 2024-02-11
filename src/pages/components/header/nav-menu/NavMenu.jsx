import style from "./NavMenu.module.css";

export const NavMenu = () => {
  return (
    <>
     <nav className={style.NavMenuWrapper}>
        <div className={style.NavMenuItem}>Бургеры</div>
        <div className={style.NavMenuItem}>Салаты</div>
        <div className={style.NavMenuItem}>Закуски</div>
        <div className={style.NavMenuItem}>Напитки</div>
     </nav>
    </>
  );
};

export default NavMenu;
