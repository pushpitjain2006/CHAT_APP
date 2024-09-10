import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";

const Authrouter = express.Router();

Authrouter.get("/", (req, res) => {
  res.send("Hello from Auth API");
});
Authrouter.post("/login", login);
Authrouter.post("/signup", signup);
Authrouter.post("/logout", logout);

export default Authrouter;
