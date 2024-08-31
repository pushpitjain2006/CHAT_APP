import jwt from "jsonwebtoken";
import User from "../Database/models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No token provided" });
    }
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.userID).select("-password");
    // console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect route middleware");
    res.status(500).json({ error: "Internal error" });
  }
};

export default protectRoute;
