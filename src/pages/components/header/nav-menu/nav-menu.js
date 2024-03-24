import style from "./nav-menu.module.css";

export const NavMenu = ({ onCategoryChange }) => {

  return (
    <>
      <nav className={style.NavMenuWrapper}>
        <div className={style.NavMenuItem} onClick={onCategoryChange} id="burger">
          Burgers
        </div>
        <div className={style.NavMenuItem} onClick={onCategoryChange} id="salat">
          Salats
        </div>
        <div className={style.NavMenuItem} onClick={onCategoryChange} id="snack">
          Snacks
        </div>
        <div className={style.NavMenuItem} onClick={onCategoryChange} id="drink">
          Drinks
        </div>
      </nav>
    </>
  );
};

export default NavMenu;
