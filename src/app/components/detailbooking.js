"use client";

import Image from "next/image";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function DetailBooking() {
  const router = useRouter();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [selectedFlight, setSelectedFlight] = useState(null);

  const apiUrl = "https://easy-lime-seal-toga.cyclic.app/booking/tickets/";
  useEffect(() => {
    getAllFlight();
  }, []);
  const getAllFlight = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.close();
      setTickets(res.data.data.result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);

      // Close the loading alert on error
      Swal.close();

      // Display an error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

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
  const [showDetail, setShowDetail] = useState(false);

  const handleDetailClick = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div>
      <div className="my-booking bg-white rounded-lg w-[806px] mt-10 h-[115px] p-5 shadow-lg">
        <h1 className="text-[14px] text-[#2395FF] font-[600] tracking-[4.2px]">MY BOOKING</h1>
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-[24px] font-[600]">My Booking</h1>
          <p className="text-[16px] text-[#2395FF] font-[600]">Order History</p>
        </div>
      </div>
      {tickets.map((ticket) => (
        <>
          <div className="status bg-white rounded-lg w-[806px] mt-10 h-[223px]  py-6 shadow-lg">
            <div className="wrapper px-10 " key={ticket?.result?.id}>
              <p className="text-[14px]">
                {formatDate(ticket?.ticket?.takeoff)} - {getFormattedTime(ticket?.ticket?.takeoff)}
              </p>
              <div className="tujuan flex items-center gap-7 pt-5 mb-3">
                <h1 className="text-[18px] font-[500]">{ticket?.ticket?.from?.code}</h1>
                <Image src="/to.svg" alt="icon plane" width={19.032} height={18}></Image>
                <h1 className="text-[18px] font-[500]">{ticket?.ticket?.to?.code}</h1>
              </div>
              <p className="text-[14px] text-[#979797]">{ticket?.ticket?.airline?.name}, AB-221</p>
            </div>
            <div className="border-t-2 border-slate-300 mt-7"></div>
            <div className="status px-10 pt-4 flex items-center gap-12 pb-5">
              <p className="text-[14px] text-[#7A7A7A] font-[600] ">Status</p>
              <div className="">
                {ticket?.status?.name === "Pending" ? (
                  <button className={`w-[184px] h-[36px] rounded-md flex items-center justify-center text-white text-[14px] font-[600] bg-[#FF7F23]`}>Waiting for payment</button>
                ) : (
                  <div className="w-[184px] h-[36px] rounded-md flex items-center justify-center text-white text-[14px] font-[600] bg-[#00FF00]">Success</div>
                )}
              </div>
              <div className="view flex items-center gap-5 ml-[280px]">
                {ticket?.status?.name === "Pending" ? (
                  <button
                    className="text-[16px] font-[600] bg-[#2395FF] text-white px-3 py-2 rounded-lg"
                    onClick={() => {
                      router.push(`/ticket-payment?code=${ticket?.code}`);
                    }}
                  >
                    Payment
                  </button>
                ) : (
                  <button
                    className="text-[16px] font-[600] text-[#2395FF] underline"
                    onClick={() => {
                      router.push(`/booking-pass?code=${ticket?.code}`);
                    }}
                  >
                    Detail
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default DetailBooking;
