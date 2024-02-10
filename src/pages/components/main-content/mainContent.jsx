import React from "react";
import style from "./mainContent.module.css";
import Slider from "../slider/Slider";
import Card from "../card/Card";
import SortBar from "../sort-bar/sort";

export const MainContent = () => {
  return (
    <>
      <div className={style.MainContentWrapper}>
        <div className={style.SliderWrapper}>
          <Slider />
        </div>
        <div className={style.Content}>
            <SortBar />
            <Card />
        </div>
      </div>
    </>
  );
};

export default MainContent;
