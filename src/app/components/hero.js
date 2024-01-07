import Image from "next/image";
import React from "react";
import CardHero from "./cardhero";

function Hero() {
  return (
    <div className="relative">
      <div className="mt-5 flex justify-between ">
        <div className="warpper-title mt-[100px]">
          <h1 className="text-[#414141] text-5xl font-[600] mb-7 px-20">
            Find your <span className="text-[#2395FF]">Flight</span>{" "}
          </h1>
          <p className="text-[#979797] text-[18px] px-20">and explore the world with us</p>
          <Image src="/hero-1.png" width={700} height={700} className="mt-[90px]"></Image>
        </div>
        <div className="wrapper-image">
          <Image src="/hero-2.png" width={400} height={400} className=" "></Image>
          <Image src="/vector.png" width={240} height={240} className="mt-10"></Image>
        </div>
      </div>
      <CardHero />
    </div>
  );
}

export default Hero;