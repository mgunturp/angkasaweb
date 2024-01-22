import React from "react";
import NavbarProfile from "../components/navbar-find-ticket";
import CardProfile from "../components/cardprofile";
import Footer from "../components/footer";
import DetailBooking from "../components/detailbooking";

function page() {
  return (
    <>
      <div className="bg-[#F5F6FA] h-auto pb-32">
        <NavbarProfile />
        <main className="flex">
          <CardProfile />
          <DetailBooking />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default page;
