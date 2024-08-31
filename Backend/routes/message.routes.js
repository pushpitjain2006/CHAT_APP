import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from Message API");
});
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

export default router;
