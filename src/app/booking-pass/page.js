import React from "react";
import NavbarProfile from "../components/navbar-find-ticket";
import BookingPass from "../components/booking";
import Footer from "../components/footer";

function page() {
  return (
    <div>
      <NavbarProfile />
      <BookingPass />
      <Footer />
    </div>
  );
}

export default page;
