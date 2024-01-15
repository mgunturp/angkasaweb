import Forgotpass from "@/app/components/Forgotpass";
import LoginLeft from "@/app/components/LoginLeft";
import React from "react";

function page() {
  return (
    <div className="flex">
      <LoginLeft />
      <Forgotpass />
    </div>
  );
}

export default page;
