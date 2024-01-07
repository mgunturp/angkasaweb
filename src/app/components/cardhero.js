import Image from "next/image";
import React from "react";

function CardHero() {
  return (
    <div className="w-[450px] bg-white h-auto pb-8 shadow-md rounded-md px-12 ml-9 absolute top-0 right-[340px] shadow-slate-400">
      <div className="title pt-4">
        <p className="leading-loose">
          <span className="text-black font-[500] text-[16px]">Hey,</span> <br></br>
          <span className="text-black font-[500] text-[20px]">Where you want to go?</span>
        </p>
      </div>
      <div className="flex justify-between mt-5 items-center">
        <p className="text-[#2395FF] font-[600] text-[16px]">Recently Searched</p>
        <Image src="/ar-blue.png" width={10} height={10}></Image>
      </div>
      <div className="from flex justify-between items-center mt-5 bg-white shadow-md p-5 rounded-lg shadow-slate-400">
        <div className="left">
          <p className="text-[#979797] text-[12px]">From</p>
          <h3 className="font-[600] text-[20px]">Medan</h3>
          <p className="text-[#979797] text-[12px]">Indonesia</p>
        </div>
        <div className="logo">
          <Image src="/transfer.png" width={17} height={17}></Image>
        </div>
        <div className="right text-right">
          <p className="text-[#979797] text-[12px]">To</p>
          <h3 className="font-[600] text-[20px]">Tokyo</h3>
          <p className="text-[#979797] text-[12px]">Japan</p>
        </div>
      </div>
      <div className="btn mt-5 flex justify-between">
        <div className="way">
          <button className="flex bg-[#2395FF] items-center px-5 py-3 gap-4 text-white font-[600] text-[14px] rounded-md">
            <Image src="/icon-white.png" width={19} height={18}></Image>
            One way
          </button>
        </div>
        <div className="way">
          <button className="flex bg-[#F0F0F0] items-center px-4 py-3 gap-4 text-[#595959] font-[600] text-[14px] rounded-md">
            <Image src="/reload.png" width={19} height={18}></Image>
            Round trip
          </button>
        </div>
      </div>
      <div className="departure mt-5">
        <p className="text-[#6B6B6B] text-[14px] font-[500]">Departure</p>
        <div className="date flex justify-between items-center mt-4 p-3 rounded-md  border-2 border-[#DDDDDD]">
          <p className="font-[700] text-[14px]">Monday, 20 July 2020</p>
          <Image src="/ar-blue.png" width={10} height={10}></Image>
        </div>
      </div>
      <div className="mt-5">
        <p className="text-[#6B6B6B] text-[14px] font-[500]">How many person?</p>
        <div className="wrapper flex justify-between">
          <div className="date flex justify-between items-center mt-4 p-3 rounded-md  border-2 border-[#DDDDDD] w-[40%]">
            <p className="font-[700] text-[14px]">2 Child</p>
            <Image src="/ar-blue.png" width={10} height={10}></Image>
          </div>
          <div className="date flex justify-between items-center mt-4 p-3 rounded-md  border-2 border-[#DDDDDD] w-[40%]">
            <p className="font-[700] text-[14px]">4 Child</p>
            <Image src="/ar-blue.png" width={10} height={10}></Image>
          </div>
        </div>
      </div>
      <div className="class mt-5">
        <p className="text-[#6B6B6B] text-[14px] font-[500]">Which class do you want?</p>
        <div className="category flex justify-between items-center mt-2">
          <div className="economy flex gap-2 items-center">
            <Image src="/blt-blue.png" width={17} height={17}></Image>
            <p className="font-[700] text-[14px]">Economy</p>
          </div>
          <div className="economy flex gap-2 items-center">
            <Image src="/blt.png" width={17} height={17}></Image>
            <p className="font-[700] text-[14px]">Business</p>
          </div>
          <div className="economy flex gap-2 items-center">
            <Image src="/blt.png" width={17} height={17}></Image>
            <p className="font-[700] text-[14px]">First Class</p>
          </div>
        </div>
      </div>
      <div className="btn bg-[#2395FF] flex justify-between items-center mt-5 px-6 py-3 rounded-md">
        <p className="text-white font-[700] text-[18px]">SEARCH FLIGHT</p>
        <Image src="/ar-white.png" width={24} height={17}></Image>
      </div>
    </div>
  );
}

export default CardHero;