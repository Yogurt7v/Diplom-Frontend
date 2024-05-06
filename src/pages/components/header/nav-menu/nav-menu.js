import style from "./nav-menu.module.css";
import {NavMenuItem} from "../../../components/nav-menu-item/nav-menu-item";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../../fetchs/getAllProducts";

export const NavMenu = ({ onCategoryChange, isActiveItem}) => {

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
            isActiveItem={isActiveItem}
            key={category}
            item={category}
            onCategoryChange={onCategoryChange}
          />
        ))}
      </nav>
    </>
  );
};

export default NavMenu;
