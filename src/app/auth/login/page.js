import FormLogin from "@/app/components/login";

import LoginLeft from "@/app/components/loginleft";
import React from "react";

function page() {
  return (
    <div className="flex">
      <LoginLeft />
      <FormLogin />
    </div>
  );
}

export default page;