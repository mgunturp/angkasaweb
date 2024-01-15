"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

function NavbarProfile() {
  const currentRoute = usePathname();
  const activeStyle = "border-b-[3px] border-[#2395FF]";
  const nonActiveStyle = "text-black";
  const [, , removeCookie] = useCookies(["access_token"]);
  const router = useRouter();

  const handleLogout = () => {
 
    removeCookie("access_token", { path: "/" });


    router.push("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center px-20 py-7 bg-white">
      <div className="logo flex gap-6 justify-between items-center">
        <Link href="/" className=" flex gap-6 justify-between items-center">
          <Image src="/icon.png" alt="icon company" width={50} height={30}></Image>
          <h1 className="text-[#414141] font-[600] text-[24px]">Ankasa</h1>
        </Link>
      </div>
      <div className="search flex items-center gap-20">
        <input type="text" placeholder="Where you want to go?" className="bg-[#F5F5F5] px-10 py-2 relative placeholder-[#6B6B6B] rounded-md" />
        <Image src="/search.png" alt="icon company" width={15} height={15} className="absolute ml-3"></Image>
        <ul className="flex gap-16">
          <li>
            <Link href="/find-ticket" className={`text-[#414141] text-[16px] font-[700] ${currentRoute === "/find-ticket" || currentRoute === "/form-ticket" ? activeStyle : nonActiveStyle} `}>
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
      <div className="profile flex items-center gap-7">
        <Image src="/email.svg" alt="icon company" width={20} height={20} className=""></Image>
        <Image src="/notif.svg" alt="icon company" width={20} height={20} className=""></Image>
        <div className="profile-pic ">
          <Link href="/profile">
            <Image src="/profile.png" alt="icon company" width={27} height={27} className="rounded-full border-2 border-[#2395FF]"></Image>
          </Link>
        </div>
        <button className="text-[#414141] text-[16px] font-[700]" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavbarProfile;
