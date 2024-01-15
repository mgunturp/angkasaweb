"use client";

import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-between items-center z-50 px-20">
      <div className="logo flex gap-6 justify-between items-center">
        <Image src="/icon.png" alt="icon company" width={50} height={30}></Image>
        <h1 className="text-[#414141] font-[600] text-[24px]">Ankasa</h1>
      </div>
      <div className="search flex items-center gap-20">
        <input type="text" placeholder="Where you want to go?" className="bg-[#F5F5F5] px-10 py-2 relative placeholder-[#6B6B6B] rounded-md" />
        <Image src="/search.png" alt="icon company" width={15} height={15} className="absolute ml-3"></Image>
        <ul className="flex gap-16">
          <li>
            <Link href="/find-ticket" className="text-[#414141] text-[16px] font-[700]">
              Find Ticket
            </Link>
          </li>
          <li>
            <Link href="#" className="text-[#414141] text-[16px] font-[700]">
              My Booking
            </Link>
          </li>
        </ul>
      </div>
      <div className="btn">
        <Link href="/auth/register">
          <button className="w-[100px] h-[40px] bg-[#2395FF] text-white rounded-md shadow-md shadow-[#9ab9d6]">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;