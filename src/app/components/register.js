import Image from "next/image";
import Link from "next/link";
import React from "react";

function FormRegister() {
  return (
    <div className=" sm:w-[50%] mx-auto overflow-hidden w-full">
      <div className="logo flex gap-6 justify-center sm:px-44 pt-7  px-28 ">
        <Image src="/icon.png" alt="icon company" width={50} height={30}></Image>
        <h1 className="text-[#414141] font-[600] text-[24px]">Ankasa</h1>
      </div>
      <div className="wrapper-form flex flex-col pt-8 h-full pb-8 sm:pb-0">
        <div className="from mx-auto ">
          <div className="title items-start flex">
            <h1 className="text-[36px] font-[600] mb-8">Register</h1>
          </div>
          <div className="fullname pb-9">
            <input type="text" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Full Name" />
          </div>
          <div className="email pb-9">
            <input type="email" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Email" />
          </div>
          <div className="password relative">
            <input type="password" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Password" />
            <Image src="/view.svg" alt="icon company" width={20} height={20} className="absolute top-1 right-0"></Image>
          </div>
          <div className="btn-signup pt-6">
            <button className="bg-[#2395FF] w-[320px] py-2 rounded-lg text-white">Sign Up</button>
          </div>
          <div className="flex items-center mt-6">
            <input type="checkbox" id="acceptTerms" className="form-checkbox h-5 w-5 text-[#2395FF]" />
            <label htmlFor="acceptTerms" className="ml-5 text-sm text-gray-700">
              Accept terms and condition
            </label>
          </div>
          <div className="login mx-auto text-center pt-3 mt-7 border-t-[1px] border-t-[#D8D8D8] w-[80%]">
            <p className="text-[#4D4D4D] text-[14px]">Already have an account?</p>
          </div>
          <div className="btn pt-6">
            <Link href="/auth/login">
              <button className="bg-white border-[1px] border-[#2395FF] w-[320px] py-2 rounded-lg text-[#2395FF]">Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormRegister;