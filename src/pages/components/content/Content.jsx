import React from "react";
import style from "./Content.module.css";
import Slider from "../slider/Slider";
import Card from "../card/Card";
import SortBar from "../sort-bar/sort";
import Discount from "../content/Image/discount.svg";

export const MainContent = () => {
  return (
    <>
      <div className={style.ContentWrapper}>
        <div className={style.SliderWrapper}>
          <button className={style.PhoneButton}><img src={Discount} alt="discount" className={style.Phone}/>Discount for registration</button>
          <Slider />
        </div>
        <div className={style.ContentCard}>
          <SortBar />
          <div className={style.ContentCardWrapper}>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
