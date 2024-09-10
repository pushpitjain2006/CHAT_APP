import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const HandelSignup = async (Inputs) => {
  console.log(Inputs);
  const {setAuthUser} = React.useContext(AuthContext);

  if (
    !Inputs.fullName ||
    !Inputs.username ||
    !Inputs.email ||
    !Inputs.phone ||
    !Inputs.gender ||
    !Inputs.password ||
    !Inputs.confirmPassword
  ) {
    toast.error("Please fill all the fields");
    return false;
  }

  const response = await fetch("http://localhost:3001/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      FullName: Inputs.fullName,
      Username: Inputs.username,
      Email: Inputs.email,
      Phone: Inputs.phone,
      Gender: Inputs.gender,
      Password: Inputs.password,
      ConfirmPassword: Inputs.confirmPassword,
    }),
  });
  const data = await response.json();
  if (data.status == 422 || data.status == 500) {
    toast.error("This is an error!");
  }
  if (data.status == 201) {
    toast.success("User registered successfully!");
    localStorage.setItem("chat-user", JSON.stringify(data));
    setAuthUser(data);
  }
  toast.error(`There is an error! ${data.error}`);
};

export default HandelSignup;
