import React from "react";
import NavbarProfile from "../components/navbar-find-ticket";
import MainFindTicket from "../components/Rute";
import Footer from "../components/footer";

function page() {
  return (
    <div className="h-auto  bg-[#F5F6FA]">
      <div className="relative">
        <NavbarProfile />
        <MainFindTicket />
      </div>
      <Footer />
    </div>
  );
}

export default page;
