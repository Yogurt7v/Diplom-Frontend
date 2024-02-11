import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "./Image/1.jpg";
import img2 from "./Image/2.jpg"
import img3 from "./Image/3.jpg"
import img4 from "./Image/4.jpg"
import img5 from "./Image/5.jpg"
import img6 from "./Image/6.jpg"
import img7 from "./Image/7.webp"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./slider.css";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

export default function Slider() {
  return (
    <>
      <Swiper
         direction="vertical"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={30}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={img1} alt=""/></SwiperSlide>
        <SwiperSlide><img src={img2} alt=""/></SwiperSlide>
        <SwiperSlide><img src={img3} alt=""/></SwiperSlide>
        <SwiperSlide><img src={img4} alt=""/></SwiperSlide>
        <SwiperSlide><img src={img5} alt=""/></SwiperSlide>
        <SwiperSlide><img src={img6} alt=""/></SwiperSlide>
        <SwiperSlide><img src={img7} alt=""/></SwiperSlide>
      </Swiper>
    </>
  );
}
