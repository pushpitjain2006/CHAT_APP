import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import HandelSignup from "../../hooks/userSignup.js";
import toast from "react-hot-toast";

const HandelSignup2 = (Inputs) => {
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
  } else if(
   Inputs.password!=Inputs.confirmPassword
  ){
    toast.error("Password and Confirm Password do not match")
  }
  else {
    HandelSignup(Inputs);
  }
};

const Signup = () => {
  let [Inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <form
      onSubmit={(e) => {
        HandelSignup2(Inputs);
        e.preventDefault();
      }}
    >
      <h1 className="text-3xl font-bold mb-4">Signup</h1>
      <div className="p-5 flex items-center justify-center">
        <div className="m-5 p-5 flex flex-col gap-3">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your full name"
              value={Inputs.fullName}
              onChange={(e) =>
                setInputs({ ...Inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your username"
              value={Inputs.username}
              onChange={(e) =>
                setInputs({ ...Inputs, username: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={Inputs.email}
              onChange={(e) => setInputs({ ...Inputs, email: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="input input-bordered w-full"
              placeholder="Enter your phone number"
              value={Inputs.phone}
              onChange={(e) => setInputs({ ...Inputs, phone: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="input input-bordered w-full"
              defaultValue=""
              onChange={(e) => setInputs({ ...Inputs, gender: e.target.value })}
            >
              <option value="" disabled hidden>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="m-5 p-5 flex flex-col gap-3">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={Inputs.password}
              onChange={(e) =>
                setInputs({ ...Inputs, password: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              className="input input-bordered w-full"
              placeholder="Confirm your password"
              value={Inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...Inputs, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div>
        <Link to="/login" className="text-blue-500 hover:underline">
          Already have an account?
        </Link>
      </div>
      <div>
        <button className="btn btn-block btn-sm mt-2">Signup hehe</button>
      </div>
    </form>
  );
};

export default Signup;
