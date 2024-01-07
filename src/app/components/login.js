import Image from "next/image";
import Link from "next/link";
import React from "react";

function FormLogin() {
  return (
    <div className="sm:w-[50%] mx-auto overflow-hidden w-full">
      <div className="logo flex gap-6  justify-center sm:px-44 pt-7  px-28 ">
        <Image src="/icon.png" alt="icon company" width={50} height={30}></Image>
        <h1 className="text-[#414141] font-[600] text-[24px]">Ankasa</h1>
      </div>
      <div className="wrapper-form flex flex-col  pt-32 h-full pb-8 sm:pb-0">
        <div className="from mx-auto">
          <div className="title items-start flex">
            <h1 className="text-[36px] font-[600] mb-8">Login</h1>
          </div>
          <div className="fullname pb-9">
            <input type="text" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Username" />
          </div>
          <div className="password relative">
            <input type="password" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Password" />
            <Image src="/view.svg" alt="icon company" width={20} height={20} className="absolute top-1 right-0"></Image>
          </div>
          <div className="btn-signup pt-6">
            <button className="bg-[#2395FF] w-[320px] py-2 rounded-lg text-white">Sign Up</button>
          </div>
          <div className="forgot text-center pt-6">
            <p className="text-[16px] text-[#595959] mb-3">Did you forgot your password?</p>
            <Link href="/auth/forgot-password" className="text-[#2395FF] text-[16px] border-b-[1px] border-[#2395FF]">
              Tap here for reset
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;