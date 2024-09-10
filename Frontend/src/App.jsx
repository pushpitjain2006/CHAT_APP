import "./App.css";
import Signup from "./pages/signup/signup.jsx";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = React.useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <Home /> : <Signup />,
    },
    {
      path: "/Signup",
      element: authUser ? <Home /> : <Signup />,
    },
    {
      path: "/login",
      element: authUser ? <Home /> : <Login />,
    },
  ]);
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </>
  );
}

export default App;
