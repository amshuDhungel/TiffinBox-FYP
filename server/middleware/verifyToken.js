import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
      return res.status(401).json({ message: "First Login to get token" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(decoded._id);

    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};
