import Image from "next/image";
import React from "react";

function LoginLeft() {
  return (
    <div className="bg-[#2395FF] sm:h-screen sm:flex sm:items-center sm:justify-center w-[50%] hidden">
      <div className="wrapper relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="384" height="408" viewBox="0 0 384 408" fill="none">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M125.906 3.54579C216.659 -18.1689 265.246 72.7659 312.194 140.026C356.831 203.973 416.584 277.887 362.441 342.415C302.841 413.445 189.591 421.423 102.072 390.447C25.3405 363.289 -3.62464 289.463 0.993983 214.487C6.24862 129.186 31.1652 26.2145 125.906 3.54579Z"
            fill="white"
            fill-opacity="0.25"
          />
        </svg>
        <div className="pesawat absolute top-[150px] left-[60px]">
          <Image src="/vector-2.svg" width={230} height={230}></Image>
          <Image src="/vector-3.svg" width={60} height={60} className="absolute top-[200px]"></Image>
          <Image src="/vector-4.svg" width={60} height={60} className="absolute top-[60px] right-[-110px]"></Image>
          <Image src="/vector-5.svg" width={40} height={40} className="absolute top-[-130px] right-[40px]"></Image>
        </div>
      </div>
    </div>
  );
}

export default LoginLeft;