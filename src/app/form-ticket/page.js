import React from "react";
import NavbarProfile from "../components/navbar-find-ticket";
import FormTicket from "../components/formticket";
import Footer from "../components/footer";

function page() {
  return (
    <>
      <div className="h-[1800px] pb-20 bg-[#F5F6FA]">
        <NavbarProfile />
        <FormTicket />
      </div>
      <Footer />
    </>
  );
}

export default page;
