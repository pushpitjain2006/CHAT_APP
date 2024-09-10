import { BiLogOut } from "react-icons/bi";
import React from "react";
import userLogout from "../../hooks/userLogout.js";

const Footer_logout = () => {
  return (
    <div className="mt-auto">
      <BiLogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={userLogout}
      />
    </div>
  );
};
export default Footer_logout;
