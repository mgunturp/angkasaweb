import Forgotpass from "../../components/forgotpassgi";
import LoginLeft from "../../components/loginleft"
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
