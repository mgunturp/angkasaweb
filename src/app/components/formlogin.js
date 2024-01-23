"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const url = process.env.NEXT_PUBLIC_API_LINK;

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["token"]);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    console.log("clik");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(url + `/auth/login`, { email, password });
      const { access_token } = response.data.data;

      // Simpan token dalam cookie
      setCookie("access_token", access_token, { path: "/" });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have login successfully!",
      });

      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };
  return (
    <div className="sm:w-[50%] mx-auto overflow-hidden w-full">
      <div className="logo flex gap-6  items-center sm:px-44 pt-7  px-28 ">
        <Image src="/icon.png" alt="icon company" width={50} height={30}></Image>
        <h1 className="text-[#414141] font-[600] text-[24px]">Ankasa</h1>
      </div>
      <div className="wrapper-form flex flex-col  pt-32 h-full pb-8 sm:pb-0">
        <div className="from mx-auto">
          <div className="title items-start flex">
            <h1 className="text-[36px] font-[600] mb-8">Login</h1>
          </div>
          <div className="fullname pb-9">
            <input type="text" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="password relative">
            <input type={showPassword ? "text" : "password"} name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Image src={showPassword ? "/hide.png" : "/view.svg"} alt="icon company" width={20} height={20} className="absolute top-1 right-0 cursor-pointer	" onClick={handleTogglePassword} />
          </div>
          <div className="btn-signup pt-6">
            <button className="bg-[#2395FF] w-[320px] py-2 rounded-lg text-white transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring focus:border-blue-300" onClick={handleLogin}>
              Sign Up
            </button>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default FormLogin;