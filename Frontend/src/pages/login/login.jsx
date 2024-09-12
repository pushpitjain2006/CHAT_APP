import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  let [Username, setUsername] = useState("");
  let [Password, setPassword] = useState("");

  async function login_back(e) {
    e.preventDefault();
    try {
      if (!Username || !Password) {
        return toast.error("Please fill all the fields");
      }
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ Username: Username, Password: Password }),
        headers: { "Content-type": "application/json" },
      });
      console.log(res);
      const data = await res.json();

      if (res.status === 422) {
        toast.error(data.error);
      } else if (res.status === 500) {
        toast.error("Internal Server Error");
      } else if (res.status === 200) {
        localStorage.setItem("chat-user", JSON.stringify(data));
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      alert(`Internal Server Error ${error}`);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={login_back}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Don't have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
