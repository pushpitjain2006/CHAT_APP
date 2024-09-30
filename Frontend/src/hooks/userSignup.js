import React from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const HandelSignup = async (Inputs) => {
  try {
    console.log(Inputs);
    const { setAuthUser } = useAuthContext();

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
    if (response.status == 422 || response.status == 500) {
      toast.error(`This is an error! ${data.error}`);
    }
    if (response.status == 201) {
      toast.success("User registered successfully!");
      try {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
      } finally {
        window.location.href = "/";
      }
    }
  } catch {
    toast.error(`There is an error!`);
  }
};

export default HandelSignup;
