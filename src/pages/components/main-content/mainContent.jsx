import React from "react";
import style from "./mainContent.module.css";
import Slider from "../slider/Slider";
import Card from "../card/Card";
import SortBar from "../sort-bar/sort";
import Phone from "../main-content/Image/phone.svg";

export const MainContent = () => {
  return (
    <>
      <div className={style.MainContentWrapper}>
        <div className={style.SliderWrapper}>
          <button className={style.PhoneButton}><img src={Phone} alt="Phone" className={style.Phone}/>+7 (999) 888-77-66</button>
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
