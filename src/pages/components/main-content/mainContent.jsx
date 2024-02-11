import React from "react";
import style from "./mainContent.module.css";
import Slider from "../slider/Slider";
import Card from "../card/Card";
import SortBar from "../sort-bar/sort";
import Discount from "../main-content/Image/discount.svg";


export const MainContent = () => {
  return (
    <>
      <div className={style.MainContentWrapper}>
        <div className={style.SliderWrapper}>
          <button className={style.PhoneButton}><img src={Discount} alt="discount" className={style.Phone}/>Discount for registration</button>
          <Slider />
        </div>
        <div className={style.Content}>
            <SortBar />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
      </div>
    </>
  );
};

export default MainContent;
