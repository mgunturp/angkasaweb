"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCookies } from "react-cookie";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const url = "https://easy-lime-seal-toga.cyclic.app";
function BookingPass() {
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState();
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [qrIdBooking, setQrIdBooking] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pdfRef = useRef();

  const flightId = searchParams.get("code");
  const token = cookies.access_token;

  const downloadTicket = () => {
    const input = pdfRef.current;
    html2canvas(input, { proxy: tickets?.ticket?.airline?.photo }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight, imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("booking-pass.pdf");
    });
  };

  useEffect(() => {
    generate();
    getDataBookingTicket();
  }, []);

  const generate = () => {
    QRCode.toDataURL("http://localhost:3000/booking-pass/" + flightId).then(setQrIdBooking);
  };

  const getDataBookingTicket = async () => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axios.get(url + "/booking/tickets/" + flightId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.close();

      setTickets(res.data.data.result);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      Swal.close();

      // Display an error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const formatTime = (dateTimeString) => {
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

  return (
    <div className="bg-[#2395FF] w-full h-[650px] flex items-center justify-center">
      <div className="">
        <div className="wrappper bg-white w-[800px] h-[550px] px-20 gap-6 flex justify-center items-center flex-col rounded-[20px] shadow-md">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[24px] font-[600]">Booking Pass</h1>
            <div className="wrapper flex gap-4">
              <Image src="/download.png" alt="icon" width={25} height={25} onClick={downloadTicket} className="cursor-pointer"></Image>
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="23" viewBox="0 0 5 23" fill="none">
                <circle cx="2.5" cy="2.5" r="2.5" fill="#2395FF" />
                <circle cx="2.5" cy="11.5" r="2.5" fill="#2395FF" />
                <circle cx="2.5" cy="20.5" r="2.5" fill="#2395FF" />
              </svg>
            </div>
          </div>

          <div ref={pdfRef} className="detail w-[650px] h-[350px] border-[1px] border-[#E5E5E5] rounded-[8px]  relative flex justify-between ">
            <div className="wrapper border-r-2 border-dashed border-[#D7D7D7] w-[70%] relative">
              <div className="logo flex items-center gap-9 p-12">
                <img src={tickets?.ticket?.airline?.photo} alt="airlines" width={100} height={57}></img>
                <div className="tujuan flex items-center gap-7 ">
                  <h1 className="text-[26px] font-[600]">
                    {tickets?.ticket?.from?.country === "Indonesia"
                      ? "IDN"
                      : tickets?.ticket?.from?.country === "France"
                      ? "FRA"
                      : tickets?.ticket?.from?.country === "United States"
                      ? "USA"
                      : tickets?.ticket?.from?.country === "United Kingdom"
                      ? "UK"
                      : tickets?.ticket?.from?.country === "Australia"
                      ? "AUS"
                      : tickets?.ticket?.from?.country}
                  </h1>
                  <Image src="/to.svg" alt="icon plane" width={19.032} height={18}></Image>
                  <h1 className="text-[26px] font-[600]">
                    {tickets?.ticket?.to?.country === "Indonesia"
                      ? "IDN"
                      : tickets?.ticket?.to?.country === "France"
                      ? "FRA"
                      : tickets?.ticket?.to?.country === "United States"
                      ? "USA"
                      : tickets?.ticket?.to?.country === "United Kingdom"
                      ? "UK"
                      : tickets?.ticket?.to?.country === "Australia"
                      ? "AUS"
                      : tickets?.ticket?.to?.country === "Japan"
                      ? "JPN"
                      : tickets?.ticket?.to?.country === "Singapore"
                      ? "SGP"
                      : tickets?.ticket?.to?.country === "Malaysia"
                      ? "MYS"
                      : tickets?.ticket?.to?.country}
                  </h1>
                </div>
              </div>
              <div className="code flex w-[270px] items-center justify-between mx-12">
                <div className="wrapper  w-[700px] flex justify-between items-center">
                  <div className="">
                    <p className="text-[12px] text-[#A5A5A5]">code</p>
                    <p className="text-[14px] text-[#595959] font-[500]">{tickets?.ticket?.from?.code}</p>
                  </div>
                  <div className="ml-8">
                    <p className="text-[12px] text-[#A5A5A5] ">Class</p>
                    <p className="text-[14px] text-[#595959] font-[500]">Economy</p>
                  </div>
                </div>
              </div>
              <div className="mt-7 flex w-[270px] items-center justify-between mx-12">
                <div className="wrapper  w-[700px] flex justify-between items-center">
                  <div className="">
                    <p className="text-[12px] text-[#A5A5A5]">Terminal</p>
                    <p className="text-[14px] text-[#595959] font-[500]">{tickets?.ticket?.from?.terminal}</p>
                  </div>
                  <div className="mr-8">
                    <p className="text-[12px] text-[#A5A5A5] mr-1">Gate</p>
                    <p className="text-[14px] text-[#595959] font-[500]">221</p>
                  </div>
                </div>
              </div>
              <div className="departure px-10 py-4 ml-3">
                <p className="text-[12px] text-[#A5A5A5] ">Departure</p>
                <p className="text-[14px] text-[#595959] font-[500]">
                  {" "}
                  {formatDate(tickets?.ticket?.takeoff)} - {formatTime(tickets?.ticket?.takeoff)}
                </p>
              </div>
              <div className="barcode"></div>
            </div>
            <div className="absolute right-[183px] top-[-1px] ">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="12" viewBox="0 0 25 12" fill="none">
                <circle cx="12.5" cy="-0.5" r="12" fill="white" stroke="#D7D7D7" />
              </svg>
            </div>
            <div className="absolute right-[183px] bottom-[-1px] ">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="13" viewBox="0 0 25 13" fill="none">
                <circle cx="12.5" cy="12.5" r="12" fill="white" stroke="#D7D7D7" />
              </svg>
            </div>
            <div className="wrapper flex  items-center justify-center ml-12">
              <div className="barcode flex  flex-col items-center justify-center mr-12">
                {flightId ? <img src={qrIdBooking} width={150} height={150} className="object-cover" alt="qr-code" /> : null}
                <h1 className="text-[#313131] text-[10px] text-center font-normal" onClick={generate}>
                  {flightId}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPass;
