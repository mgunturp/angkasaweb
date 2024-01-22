import Image from "next/image";
import React from "react";

function CardProfile() {
  return (
    <div>
      <div className="warpper mx-20  w-[325px] h-[715px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-start mt-10 py-7 gap-6">
        <div className="picture rounded-full ">
          <Image src="/picture.png" alt="profile picture" width={100} height={183} className="rounded-full border-2 p-2 border-[#2395FF]"></Image>
        </div>
        <div className="btn">
          <button className="w-[150px] border-[1px] border-[#2395FF] h-[56px] font-[700] text-[16px] text-[#2395FF] rounded-lg">Select Photo</button>
        </div>
        <div className="name">
          <h1 className="text-[20px] font-[600] text-center">Mike Kowalski</h1>
          <div className="location flex items-center gap-2 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8.13 2 5 5.13 5 9C5 13.17 9.42 18.92 11.24 21.11C11.64 21.59 12.37 21.59 12.77 21.11C14.58 18.92 19 13.17 19 9C19 5.13 15.87 2 12 2ZM12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.66304 14.2366 10.2989 13.7678 10.7678C13.2989 11.2366 12.663 11.5 12 11.5Z"
                fill="#2395FF"
              />
            </svg>
            <p className="text-[14px] text-[#6B6B6B]">Medan, Indonesia</p>
          </div>
        </div>
        <div className="cards w-full px-5">
          <div className="titel flex justify-between">
            <p className="text-[14px] font-[600]">Cards</p>
            <p className="text-[14px] font-[600] text-[#2395FF]">+ Add</p>
          </div>
          <div className="detail bg-[#2395FF] p-3 mt-2 rounded-lg shadow-lg shadow-[#AEFAFF] ">
            <p className="text-white text-[14px] font-[600]">4441 1235 5512 5551</p>
            <div className="desc flex items-center justify-between text-[12px] text-[#AEFAFF] mt-2">
              <p>X Card</p>
              <p>$ 1,440.2</p>
            </div>
          </div>
          <div className="settings mt-10  px-4 flex flex-col gap-7">
            <div className="profile flex items-center justify-between">
              <Image src="/user.svg" alt="user icon" width={25} height={25} className="rounded-full border-2 border-blue-400"></Image>
              <p className="mr-20 text-[14px] text-[#2395FF] font-[600]">Profile</p>
              <Image src="/ar-blue.png" alt="arrow" width={10} height={10}></Image>
            </div>
            <div className="profile flex items-center justify-between">
              <Image src="/star.svg" alt="user icon" width={25} height={25} className="rounded-full"></Image>
              <p className="mr-10 text-[14px]  font-[600]">My Review</p>
              <Image src="/gray.png" alt="arrow" width={20} height={20} className="-mr-1"></Image>
            </div>
            <div className="profile flex items-center justify-between">
              <Image src="/setting.svg" alt="user icon" width={25} height={25} className="rounded-full"></Image>
              <p className="mr-14 text-[14px]  font-[600]">Settings</p>
              <Image src="/gray.png" alt="arrow" width={20} height={20} className="-mr-1"></Image>
            </div>
            <div className="profile flex items-center justify-between">
              <Image src="/logout.svg" alt="user icon" width={25} height={25} className="rounded-full"></Image>
              <p className="mr-14 text-[14px] text-[#F24545] font-[600]">Logout</p>
              <Image src="/red.png" alt="arrow" width={20} height={20} className="-mr-1"></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
