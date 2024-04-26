import style from "./nav-menu-item.module.css";

export const NavMenuItem = ({ item, onCategoryChange, isActive }) => {
  const name = item
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return (
    <>
      <div
        className={isActive ? style.NavMenuItemSelected : style.NavMenuItem}
        onClick={onCategoryChange}
        id={item}
      >
        {name}
      </div>
    </>
  );
};
