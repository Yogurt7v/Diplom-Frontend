import style from "./nav-menu.module.css";
import {NavMenuItem} from "../../../components/nav-menu-item/nav-menu-item";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getAllProducts } from "../../../../fetchs/getAllProducts";

export const NavMenu = ({ onCategoryChange}) => {

  const [allCategorys, setAllCategorys] = useState([])
  
  useEffect(() => {
    getAllProducts().then(res =>{
      const uniqueCategorys = [...new Set(res.map(({ category }) => category))];
      uniqueCategorys.unshift("All");
      setAllCategorys(uniqueCategorys);
      })
  },[])
  


  return (
    <>
      <nav className={style.NavMenuWrapper}>

        {allCategorys.map((category) => (
          <NavMenuItem
            key={category}
            item={category}
            onCategoryChange={onCategoryChange}
          />
        ))}
        
        {/* <div
          className={
            isActive ? style.NavMenuItemSelected : style.NavMenuItem
          }
          onClick={onCategoryChange}
          id="burger"
        >
          Burgers
        </div>
        <div
          className={style.NavMenuItem}
          onClick={onCategoryChange}
          id="salat"
        >
          Salats
        </div>
        <div
          className={style.NavMenuItem}
          onClick={onCategoryChange}
          id="snack"
        >
          Snacks
        </div>
        <div
          className={style.NavMenuItem}
          onClick={onCategoryChange}
          id="drink"
        >
          Drinks
        </div> */}
      </nav>
    </>
  );
};

export default NavMenu;
