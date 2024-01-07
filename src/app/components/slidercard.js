"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

function SliderCard() {
  const ImageSlider = [
    {
      image: "/paris.png",
      country: "Paris",
    },
    {
      image: "/balii.png",
      country: "Bali",
    },
    {
      image: "/sg.png",
      country: "Singapore",
    },
    {
      image: "/india.png",
      country: "Agra",
    },
    {
      image: "/ausi.png",
      country: "Sydney",
    },
    {
      image: "/paris.png",
      country: "Paris",
    },
    {
      image: "/balii.png",
      country: "Bali",
    },
    {
      image: "/sg.png",
      country: "Singapore",
    },
    {
      image: "/india.png",
      country: "Agra",
    },
    {
      image: "/ausi.png",
      country: "Sydney",
    },
  ];
  return (
    <div className="mx-20 mt-20 bg-[#2395FF] h-[500px] rounded-[40px] overflow-hidden relative flex flex-col items-center">
      <div className="title text-center mt-20">
        <p className="font-[500] text-[14px] text-white tracking-[.25em]">TOP 10</p>
        <p className="font-[600] text-[24px] text-white">Top 10 destinations</p>
      </div>
      <Swiper modules={[Autoplay, EffectCoverflow, Pagination]} slidesPerView={5} spaceBetween={0} autoplay={{ delay: 3000 }} className="swiper_container w-[900px] flex-1">
        {ImageSlider.map((item) => (
          <SwiperSlide className="px-2" key={item.country}>
            <div className="wrapper flex flex-col items-center gap-6 mt-10">
              <div className="relative h-[122px] overflow-hidden rounded-full w-[122px] border-[5px] border-white">
                <Image src={item.image} alt="slide_image" layout="fill" objectFit="cover" className=" transform hover:scale-105 transition-transform duration-300 border-[7px] border-[#2395FF] w-full h-full rounded-full" />
              </div>
              <div className="title ">
                <h1 className="font-[400] text-[18px] text-white uppercase">{item.country}</h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="logo absolute left-0 top-[170px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="342" viewBox="0 0 500 342" fill="none">
          <path
            d="M62.9307 330.279C67.8369 337.583 74.7274 341.727 81.9382 341.716L183.921 341.524C191.969 341.509 199.901 338.904 207.076 333.92L434.385 176.244C455.275 161.753 474.001 141.067 486.743 113.974C501.047 83.5606 502.602 61.5511 496.954 46.0024C491.321 30.443 477.626 19.0164 451.447 16.6884C428.127 14.6166 404.932 23.0104 384.042 37.4912L307.082 90.8757L136.226 3.24345C134.172 1.35174 131.785 0.244441 129.313 0.0360434C126.841 -0.172354 124.373 0.525715 122.164 2.05807L70.7977 37.6941C62.462 43.4714 60.4464 58.6784 66.7588 68.1614L188.803 172.923L108.172 228.86L51.6497 189.913C49.7023 188.571 47.5514 187.874 45.3706 187.878C43.1898 187.881 41.0401 188.586 39.0952 189.935L7.74426 211.688C-0.411833 217.348 -2.56023 232.106 3.39278 241.675L62.9307 330.279Z"
            fill="#41A4FF"
          />
        </svg>
      </div>
    </div>
  );
}

export default SliderCard;