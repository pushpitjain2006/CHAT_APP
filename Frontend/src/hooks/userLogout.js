import { useAuthContext } from "../context/AuthContext";
import { useState, useContext } from "react";
import React from "react";

const userLogout = async () => {
  try {
    // console.log(1);
    const setAuthUser = useAuthContext();
    // console.log(2);
    // setLoading(true);
    const res = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      headers: { "Content-type": "application/json" },
    });
    // const data = await res.json();
    if (res.status === 500) {
      alert("Internal Server Error");
    }
    if (res.status === 200) {
      try {
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      } finally {
        window.location.href = "/login";
      }
    }

    // console.log(3);
  } catch (e) {
    console.log(e);
  } finally {
    // setLoading(false);
  }
};

export default userLogout;
