import React from "react";
import NavbarProfile from "../components/navbar-find-ticket";
import Payment from "../components/payment";
import Footer from "../components/footer";

function page() {
  return (
    <>
      <div className="h-auto pb-20">
        <NavbarProfile />
        <Payment />
      </div>
      <Footer />
    </>
  );
}

export default page;
