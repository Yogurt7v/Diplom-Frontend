import style from "./busket.module.css";
import Header from "../components/header/header";
import { useDispatch, useSelector } from "react-redux";
import { selectBusket, selectUserId } from "../../selectors";
import { removeBusketData } from "../../actions";
import { addBusketData } from "../../actions/add-busket-data";
import { useEffect } from "react";
import { useState } from "react";
// import SearchBar from "../components/search-bar/search-bar";
// import BusketCard from "../components/busket-card/busket-card";

export const Busket = () => {

  const dispatch = useDispatch();
  const userOnPage = useSelector(selectUserId);
  const busket = useSelector(selectBusket);


  const deleteItem = (randomId) => {
    dispatch(removeBusketData(randomId));
    
  }


  return (
    <>
      <Header />
      <div className={style.BusketWrapper}>
      <h2>Корзина</h2>
        <div className={style.BusketCardSWrapper}>
          {busket.items.length >0 ? busket.items.map((item) => 
          (<>
          <div key={item.id} className={style.BusketItemWrapper} >
              <div>Название: {item.productName}</div>
              <div>Цена: {item.price}</div>
              <div>Количество: {item.quantity}</div>
              <div>Итого: {item.price * item.quantity}</div>
              <button className={style.BusketButton} onClick={()=>deleteItem(item.randomId)}>delete</button>

          </div>

          </>)): <div>Корзина пуста</div>}
        </div>
      <div className={style.BusketSumWrapper}>
        <h3>Sum</h3>
        <div className={style.BusketSum}>Sum number</div>
        <button className={style.BusketButton}>lets go</button>
      </div>
      </div>
    </>
  );
};

export default Busket;
