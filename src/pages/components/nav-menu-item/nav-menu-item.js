import { useState } from "react";
import style from "./nav-menu-item.module.css";

export const NavMenuItem = ({ item, onCategoryChange, isActiveItem }) => {


  const name = item
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");


  return (
    <>
      <div
        className={isActiveItem === name.toLowerCase() ? style.NavMenuItemSelected : style.NavMenuItem}
        onClick={(item) => {
          onCategoryChange(item);
        }}
        id={item}
      >
        {name}
      </div>
    </>
  );
};
