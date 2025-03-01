import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "No token provided - Unauthorized" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protect middleware", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid acces token" });
  }
};

export const adminRoute = async (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next()
    } else 
    return res.status(403).json({message: "Forbidden - Access denied"})
}
