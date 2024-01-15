"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

function FormTicket() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cookies, setCookie] = useCookies(["access_token"]);

  const flightId = searchParams.get("code");
  const token = cookies.access_token;

  const [toggleSameContact, setToggleSameContact] = useState(false);
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [codePhone, setCodePhone] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [title, setTitle] = useState();
  const [nationality, setNationality] = useState();
  const [fullnameSameAsContact, setFullnameSameAsContact] = useState();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      Swal.fire({
        title: "Fetching Flight Details",
        html: "Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        if (flightId) {
          const response = await axios.get(`https://easy-lime-seal-toga.cyclic.app/airlines/flight/${flightId}`);
          const data = response.data.data;
          console.log(data);
          setSelectedFlight(data);
        }
        Swal.close();
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    fetchData();
  }, [flightId]);

  const getFormattedTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();
    return `${day}/${month < 10 ? "0" : ""}${month + 1}/${year}`;
  };

  const handleProceedPayment = async (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    if (!fullname || !fullnameSameAsContact) {
      return Swal.fire({
        title: "Failed!",
        text: "Fullname required",
        icon: "error",
      });
    }
    if (!email) {
      return Swal.fire({
        title: "Failed!",
        text: "Email required",
        icon: "error",
      });
    }
    if (!phoneNumber || !codePhone) {
      return Swal.fire({
        title: "Failed!",
        text: "Phone Number required",
        icon: "error",
      });
    }
    if (!title) {
      return Swal.fire({
        title: "Failed!",
        text: "Title required",
        icon: "error",
      });
    }
    if (!nationality) {
      return Swal.fire({
        title: "Failed!",
        text: "Nationality required",
        icon: "error",
      });
    }
    const formInput = {
      title,
      fullname: `${toggleSameContact ? fullname : fullnameSameAsContact}`,
      nationality,
    };
    console.log(formInput);

    if (isLoading) {
      Swal.fire({
        title: "Booking ticket...",
        html: "Please wait...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    try {
      const res = await axios.post("https://easy-lime-seal-toga.cyclic.app/booking/tickets/" + flightId, formInput, {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data.message);

      const ticketCode = res.data.data.code;
      console.log(`Ticket Code: ${ticketCode}`);
      Swal.fire({
        title: "Success!",
        text: "Booking ticket successful, waiting for payment!",
        icon: "success",
      });

      router.push(`/ticket-payment?code=${ticketCode}`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Failed!",
        text: error.response.data.data.message,
        icon: "error",
      });
    } finally {
      setIsLoading(!isLoading);
    }
  };

  return (
    <div>
      <div className="w-full bg-[#2395FF] h-[200px] relative rounded-b-[30px] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="217" height="172" viewBox="0 0 217 172" fill="none" className="absolute bottom-0 -z-10">
          <path
            d="M20.3188 166.013C22.5266 169.675 25.6273 171.752 28.8722 171.746L74.7643 171.65C78.386 171.642 81.9556 170.337 85.1844 167.838L187.473 88.8008C196.874 81.5367 205.3 71.1679 211.034 57.5872C217.471 42.3417 218.171 31.3091 215.629 23.5151C213.094 15.7157 206.932 9.98796 195.151 8.821C184.657 7.78251 174.219 11.99 164.819 19.2487L130.187 46.0086L53.3018 2.08152C52.3774 1.13327 51.3034 0.578218 50.1909 0.473756C49.0784 0.369293 47.9677 0.719211 46.9738 1.48733L23.859 19.3504C20.1079 22.2464 19.2009 29.8692 22.0414 34.6227L76.9615 87.136L40.6774 115.175L15.2424 95.6527C14.3661 94.98 13.3981 94.6304 12.4168 94.6323C11.4354 94.6341 10.4681 94.9873 9.59285 95.6634L-4.51508 106.568C-8.18533 109.405 -9.1521 116.803 -6.47325 121.599L20.3188 166.013Z"
            fill="#41A4FF"
          />
        </svg>
        <div className="rute flex justify-between items-center pt-16 px-20">
          <h1 className="text-[24px] text-white font-[600]">Contact Person Details</h1>
          <div className="flex w-[412px] justify-between items-center">
            <h1 className="text-[24px] text-white font-[600]">Flight Details</h1>
            <p className="text-[16px] text-white font-[600]">View Details</p>
          </div>
        </div>
        <div className="containerr flex h-[1400px]">
          <div className="left">
            <div className="form mt-10 w-[709px] mx-20 bg-white shadow-xl rounded-lg pb-[1px]">
              <div className="px-10 py-10   w-full">
                <div className="fullname pb-9 flex flex-col ">
                  <label className="text-[14px] text-[#9B96AB] pb-2">Full Name</label>
                  <input type="text" name="" id="" className="outline-none  border-b-2 pb-3 placeholder-black placeholder-[16px]" placeholder="Mike Kowalski" onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div className="email pb-9 flex flex-col">
                  <label className="text-[14px] text-[#9B96AB] pb-2">Email</label>
                  <input type="email" name="" id="" className="outline-none border-b-2 pb-3 placeholder-black placeholder-[16px]" placeholder="flightbooking@ankasa.com" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="password flex  border-b-2 pb-3">
                  <div className="country-code ">
                    <select onChange={(e) => setCodePhone(e.target.value)}>
                      <option value="">Select</option>
                      <option value="+62">+62 (ID)</option>
                      <option value="1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                    </select>
                  </div>
                  <div className="border-r-[1px] border-slate-300 pr-3"></div>
                  <div className="email flex flex-col w-full pl-3">
                    <input type="email" name="" id="" className="outline-none placeholder-black placeholder-[16px]" placeholder="81987654321" onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                </div>
              </div>
              <div className="warning flex items-center gap-4 px-10 mb-10 rounded-[10px]  bg-red-200 mx-10 h-[50px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.3993 20.0625L12.6493 3.1875C12.504 2.93672 12.2532 2.8125 12.0001 2.8125C11.747 2.8125 11.4939 2.93672 11.3509 3.1875L1.60089 20.0625C1.31261 20.5641 1.67354 21.1875 2.25011 21.1875H21.7501C22.3267 21.1875 22.6876 20.5641 22.3993 20.0625ZM11.2501 9.75C11.2501 9.64687 11.3345 9.5625 11.4376 9.5625H12.5626C12.6657 9.5625 12.7501 9.64687 12.7501 9.75V14.0625C12.7501 14.1656 12.6657 14.25 12.5626 14.25H11.4376C11.3345 14.25 11.2501 14.1656 11.2501 14.0625V9.75ZM12.0001 18C11.7057 17.994 11.4254 17.8728 11.2193 17.6625C11.0133 17.4522 10.8978 17.1695 10.8978 16.875C10.8978 16.5805 11.0133 16.2978 11.2193 16.0875C11.4254 15.8772 11.7057 15.756 12.0001 15.75C12.2945 15.756 12.5748 15.8772 12.7809 16.0875C12.987 16.2978 13.1024 16.5805 13.1024 16.875C13.1024 17.1695 12.987 17.4522 12.7809 17.6625C12.5748 17.8728 12.2945 17.994 12.0001 18Z"
                    fill="#F24545"
                  />
                </svg>
                <div className="text">
                  <p className="text-[14px] text-[#595959]">Make sure the customer data is correct.</p>
                </div>
              </div>
            </div>
            <div className="pb-9 mt-12 w-[709px] mx-20">
              <h1 className="text-[24px] font-[600]">Passenger Details</h1>
            </div>
            <div className="detail mt-1 w-[709px] mx-20 bg-white shadow-xl rounded-lg pb-[1px]">
              <div className="wrapper px-10 py-10   ">
                <div className="title flex justify-between items-center bg-teal-100  px-10 mb-10 rounded-[10px]   h-[50px]">
                  <h1 className="text-[#595959] font-[600] text-[14px]">Passenger : 1 Adult</h1>
                  <div className="togl flex items-center gap-3">
                    <h1 className="text-[#595959] font-[600] text-[14px]">Same as contact person</h1>
                    <label htmlFor="toggle" className={`${toggleSameContact ? "bg-[#2395ff]" : "bg-[#C4C4C4]"} w-[55px] h-[30px] rounded-full cursor-pointer relative peer-checked:bg-yellow-300`}>
                      <input type="checkbox" id="toggle" className="sr-only peer" onChange={() => setToggleSameContact(!toggleSameContact)} />
                      <span className="bg-white w-[24px] h-[24px] rounded-full absolute left-[3px] top-[3px] peer-checked:left-[28px] transition-all duration-500"></span>
                    </label>
                  </div>
                </div>
                <div className="password border-b-2 pb-3">
                  <div className="country-code mb-3">
                    <label className="text-[14px] text-[#9B96AB] pb-2">Title</label>
                  </div>
                  <div className="w-full">
                    <select onChange={(e) => setTitle(e.target.value)}>
                      <option value="">Select Title</option>
                      <option value="mr">Mr.</option>
                      <option value="mrs">Mrs.</option>
                    </select>
                  </div>
                </div>
                <div className="fullname pb-9 flex flex-col mt-6">
                  <label className="text-[14px] text-[#9B96AB] pb-2">Full Name</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="outline-none  border-b-2 pb-3 placeholder-black placeholder-[16px]"
                    placeholder="Mike Kowalski"
                    onChange={(e) => setFullnameSameAsContact(e.target.value)}
                    value={toggleSameContact ? fullname : fullnameSameAsContact}
                    disabled={toggleSameContact ? true : false}
                  />
                </div>
                <div className="password border-b-2 pb-3">
                  <div className="country-code mb-3">
                    <label className="text-[14px] text-[#9B96AB] pb-2">Nationallity</label>
                  </div>
                  <div className="w-full">
                    <select onChange={(e) => setNationality(e.target.value)}>
                      <option value="">Select</option>
                      <option value="1">Indonesia</option>
                      <option value="2">America</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-9 mt-12 w-[709px] mx-20">
              <h1 className="text-[24px] font-[600]">Passenger Details</h1>
            </div>
            <div className="form mt-1 w-[709px] mx-20 bg-white shadow-xl rounded-lg pb-[1px]">
              <div className="wrapper px-10 py-10">
                <div className="cek flex items-center justify-between">
                  <div className="flex items-center pt-3">
                    <input type="checkbox" className="mr-3 w-5 h-5 " name="direct" />
                    <label className="text-[18px] font-[600] block " id="direct">
                      Travel Insurance
                    </label>
                  </div>
                  <div className="">
                    <h1>$ 2,00/pax</h1>
                  </div>
                </div>
              </div>
              <div className="border-[1px] border-slate-300 w-[709px] px-0 mx-0"></div>
              <div className="text px-10 py-9">
                <h1 className="text-[14px]">Get travel compensation up to $ 10.000,00</h1>
              </div>
            </div>
            <div className="px-20 py-10 text-center ">
              <button onClick={(e) => handleProceedPayment(e)} className="w-[319px] bg-[#2395FF] px-16 py-4 text-white rounded-lg shadow-sm shadow-[#2395FF] hover:bg-blue-700 transition duration-300">
                Proceed to Payment
              </button>
            </div>
          </div>
          <div className="right w-[412px] h-[375px] bg-white rounded-md shadow-lg mt-10">
            <div className="wrapper">
              <div className="logo flex px-8 py-7 gap-10 items-center">
                <img src={selectedFlight?.photo} alt="icon" width={100} height={57}></img>
                <h1 className="text-[18px] font-[500] text-[#595959]">{selectedFlight?.name}</h1>
              </div>
              <div className="tujuan flex items-center gap-7 px-8 py-5">
                <h1 className="text-[19px] font-[500]">
                  {selectedFlight?.from?.country === "Indonesia"
                    ? "IDN"
                    : selectedFlight?.from?.country === "France"
                    ? "FRA"
                    : selectedFlight?.from?.country === "United States"
                    ? "USA"
                    : selectedFlight?.from?.country === "United Kingdom"
                    ? "UK"
                    : selectedFlight?.from?.country === "Australia"
                    ? "AUS"
                    : selectedFlight?.from?.country}
                </h1>
                <Image src="/to.svg" alt="icon plane" width={19.032} height={18}></Image>
                <h1 className="text-[18px] font-[500]">
                  {selectedFlight?.to?.country === "Indonesia"
                    ? "IDN"
                    : selectedFlight?.to?.country === "France"
                    ? "FRA"
                    : selectedFlight?.to?.country === "United States"
                    ? "USA"
                    : selectedFlight?.to?.country === "United Kingdom"
                    ? "UK"
                    : selectedFlight?.to?.country === "Australia"
                    ? "AUS"
                    : selectedFlight?.to?.country === "Japan"
                    ? "JPN"
                    : selectedFlight?.to?.country === "Singapore"
                    ? "SGP"
                    : selectedFlight?.to?.country === "Malaysia"
                    ? "MYS"
                    : selectedFlight?.to?.country}
                </h1>
              </div>
              <div className="date px-8 flex items-center gap-6">
                <p className="text-[12px] text-[#6B6B6B]">{formatDate(selectedFlight?.takeoff)}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                  <circle cx="2.5" cy="2.5" r="2.5" fill="#6B6B6B" />
                </svg>
                <p className="text-[12px] text-[#6B6B6B]">
                  {getFormattedTime(selectedFlight?.takeoff)} - {getFormattedTime(selectedFlight?.landing)}{" "}
                </p>
              </div>
              <div className="benefit px-8 py-5">
                <div className="one flex items-center gap-5 pb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9.25" fill="white" stroke="#2395FF" stroke-width="1.5" />
                    <path
                      d="M14.4238 7.20523C14.1553 6.93171 13.72 6.93159 13.4513 7.20486L8.43755 12.3097L6.17367 10.0047C5.90503 9.73141 5.46966 9.73157 5.20122 10.0051C4.93278 10.2786 4.93295 10.7219 5.20159 10.9952L7.95151 13.795C8.21999 14.0683 8.65516 14.0683 8.9236 13.795L14.4234 8.19533C14.692 7.92202 14.6922 7.47875 14.4238 7.20523Z"
                      fill="#2395FF"
                    />
                  </svg>
                  <p className="text-[14px] text-[#2395FF] font-[500]">Refundable</p>
                </div>
                <div className="two flex items-center gap-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="9.25" fill="white" stroke="#2395FF" stroke-width="1.5" />
                    <path
                      d="M14.4238 7.20523C14.1553 6.93171 13.72 6.93159 13.4513 7.20486L8.43755 12.3097L6.17367 10.0047C5.90503 9.73141 5.46966 9.73157 5.20122 10.0051C4.93278 10.2786 4.93295 10.7219 5.20159 10.9952L7.95151 13.795C8.21999 14.0683 8.65516 14.0683 8.9236 13.795L14.4234 8.19533C14.692 7.92202 14.6922 7.47875 14.4238 7.20523Z"
                      fill="#2395FF"
                    />
                  </svg>
                  <p className="text-[14px] text-[#2395FF] font-[500]">Can reschedule</p>
                </div>
              </div>
              <div className="border-[1px] border-[#E6E6E6]"></div>
              <div className="total px-8 flex py-5 justify-between items-center">
                <h1 className="text-[18px] font-[500]">Total Payment</h1>
                <div className="price flex items-center gap-3 justify-between">
                  <h1 className="text-[24px] font-[600] text-[#2395FF]">$ {selectedFlight?.price}, 00</h1>
                  <Image src="/btnback.svg" alt="arrow" width={12} height={12} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormTicket;
