const jwt = require("jsonwebtoken");
const User = require("../models/User");

const socketAuthMiddleware = async (socket, next) => {
  try {
    
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log("Socket connection denied: No token provided");
      const err = new Error("Not authorized, no token provided");
      return next(err);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("Socket connection denied: User not found for token");
      const err = new Error("Not authorized, user not found");
      return next(err);
    }

    socket.user = user;

    console.log(
      `Socket authenticated for user: ${user.username} (${user._id})`,
    );
    next(); 
  } catch (error) {
    console.error("Socket Auth Error:", error.message);
    const err = new Error("Not authorized, token failed");
    next(err);
  }
};

module.exports = socketAuthMiddleware;
