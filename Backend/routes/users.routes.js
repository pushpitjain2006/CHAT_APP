import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controllers.js";

const UserRoutes = express.Router();

UserRoutes.get("/", protectRoute, getUsersForSidebar);

export default UserRoutes;
