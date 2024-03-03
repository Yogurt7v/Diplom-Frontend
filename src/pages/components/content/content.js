import React from "react";
import style from "./сontent.module.css";
import Slider from "../slider/Slider";
import Card from "../card/card";
import SortBar from "../sort-bar/sort";
// import Discount from "../content/Image/discount.svg";

export const MainContent = () => {
  return (
    <>
      <div className={style.ContentWrapper}>
        <div className={style.ContentCard}>
          <SortBar />
          <div className={style.ContentCardWrapper}>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className={style.SliderWrapper}>
          <button className={style.PhoneButton}>Здесь будет анимированная корзина</button>
          <Slider />
        </div>
      </div>
    </>
  );
};

export default MainContent;
