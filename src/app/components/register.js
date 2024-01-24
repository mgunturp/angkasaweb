"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    console.log("clik");
  };

  const handleRegister = async () => {
    try {
      Swal.fire({
        title: "Registering...",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      const response = await axios.post("https://easy-lime-seal-toga.cyclic.app/auth/register", { name, email, password });
      const { access_token } = response.data.data;

      setCookie("token", access_token, { path: "/" });

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered!",
      });

      router.push("/auth/login");
    } catch (error) {
      console.error("Register error:", error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className=" sm:w-[50%] mx-auto  overflow-hidden w-full">
      <div className="logo flex gap-6 justify-center sm:px-44 pt-7  px-28 ">
        <Image src="/icon.png" alt="icon company" width={50} height={30}></Image>
        <h1 className="text-[#414141] font-[600] text-[24px]">Ankasa</h1>
      </div>
      <div className="wrapper-form  flex flex-col pt-8 h-full pb-8 sm:pb-0">
        <div className="from mx-auto  ">
          <div className="title items-start justify-center flex">
            <h1 className="text-[36px] font-[600] mb-8">Register</h1>
          </div>
          <div className="fullname pb-9">
            <input type="text" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="email pb-9">
            <input type="email" name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="password relative">
            <input type={showPassword ? "text" : "password"} name="" id="" className="outline-none w-[320px] border-b-2 pb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <Image src={showPassword ? "/hide.png" : "/view.svg"} alt="icon company" width={20} height={20} className="absolute top-1 right-0 cursor-pointer	" onClick={handleTogglePassword} />
          </div>
          <div className="btn-signup pt-6">
            <button className="bg-[#2395FF] w-[320px] py-2 rounded-lg text-white transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring focus:border-blue-300" onClick={handleRegister}>
              Sign Up
            </button>
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
              <button className="bg-white border-[1px] border-[#2395FF] w-[320px] py-2 rounded-lg text-[#2395FF] transition duration-300 ease-in-out transform  hover:scale-105 focus:outline-none focus:ring focus:border-blue-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormRegister;
