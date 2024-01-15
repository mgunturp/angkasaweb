import FormLogin from "@/app/components/login";

import LoginLeft from "@/app/components/LoginLeft";
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