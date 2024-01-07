import FormRegister from "@/app/components/register";
import LoginLeft from "@/app/components/loginleft";
import React from "react";

function page() {
  return (
    <div className="flex">
      <LoginLeft />
      <FormRegister />
    </div>
  );
}

export default page;