import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const Authrouter = express.Router();

Authrouter.get("/", (req, res) => {
  res.send("Hello from Auth API");
});
Authrouter.get("/login", login);
Authrouter.get("/signup", signup);
Authrouter.get("/logout", logout);

export default Authrouter;
