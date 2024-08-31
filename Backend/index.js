// Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import path from "path";
import connectToDatabase from "./Database/Connector.js";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth.routes.js";
import MessageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/users.routes.js";

// Configurations
dotenv.config();

// Variables
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());

// Routes (Middlewares)
app.use("/api/auth", AuthRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/users", UserRoutes);

// Server Listening
server.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server running on port: ${PORT}`);
});
