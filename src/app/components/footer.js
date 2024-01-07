import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <footer className="mt-20 mx-20">
      <div className="wrapper flex justify-between">
        <div className="wrapper-logo">
          <div className="logo flex gap-6  items-center">
            <Image src="/icon.png" alt="icon company" width={50} height={30}></Image>
            <h1 className="text-[#414141] font-[600] text-[24px]">Ankasa</h1>
          </div>
          <p className="pt-7 text-[14px] leading-[221.429%] text-[#6B6B6B]">
            Find your Flight and explore the<br></br> world with us. We will take care of the rest
          </p>
        </div>
        <div className="feature">
          <h1 className="text-[16px] font-[500] pb-6">Features</h1>
          <ul>
            <li className="text-[14px] text-[#6B6B6B] pb-5">Find Ticket</li>
            <li className="text-[14px] text-[#6B6B6B] pb-5">My Booking</li>
            <li className="text-[14px] text-[#6B6B6B] pb-5">Chat</li>
            <li className="text-[14px] text-[#6B6B6B] pb-5">Notification</li>
          </ul>
        </div>
        <div className="app">
          <h1 className="text-[16px] font-[500] pb-6">Download Angkasa app</h1>
          <Image src="/apple.png" alt="icon company" width={200} height={60} className="pb-7"></Image>
          <Image src="/play.png" alt="icon company" width={200} height={60}></Image>
        </div>
        <div className="media">
          <h1 className="text-[16px] font-[500] pb-6">Follow Us</h1>
          <div className="flex gap-5">
            <Image src="/facebook.svg" alt="icon company" width={24} height={24}></Image>
            <Image src="/twitter.svg" alt="icon company" width={24} height={24}></Image>
            <Image src="/instagram.svg" alt="icon company" width={24} height={24}></Image>
            <Image src="/youtube.svg" alt="icon company" width={24} height={24}></Image>
          </div>
        </div>
      </div>
      <div className="copyright flex justify-between pt-3">
        <h1>© Ankasa. All Rights Reserved.</h1>
        <div className="location flex items-center gap-2">
          <Image src="/map-pin.svg" alt="icon company" width={14} height={14}></Image>
          <h1 className="text-[14px]">Jakarta Indonesia</h1>
        </div>
      </div>
    </footer>
  );
}

export default Footer;