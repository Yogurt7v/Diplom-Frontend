import { useState } from "react";
import style from "./nav-menu-item.module.css";

export const NavMenuItem = ({ item, onCategoryChange }) => {


  const name = item
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
    
  const [isActive, setActive] = useState(false);

  return (
    <>
      <div
        className={isActive ? style.NavMenuItemSelected : style.NavMenuItem}
        onClick={(item) => {
          onCategoryChange(item);
          setActive(!isActive)
        }}
        id={item}
      >
        {name}
      </div>
    </>
  );
};
