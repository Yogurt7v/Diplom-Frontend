import React from "react";
import style from "./mainContent.module.css";
import Slider from "../slider/Slider";
import Card from "../card/Card";

export const MainContent = () => {
  return (
    <>
      <div className={style.MainContentWrapper}>
        <div className={style.SliderWrapper}>
          <Slider />
        </div>
        <div className={style.Content}>
            <div className={style.Content__sort}>
                <span>by price</span>
                <span>by quantity</span>
                <span>by rating</span>
            </div>
            <Card />
        </div>
      </div>
    </>
  );
};

export default MainContent;
