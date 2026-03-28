const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const errors = {};

    if (!username) errors.username = "Username is required.";
    else if (username.length < 3)
      errors.username = "Username must be at least 3 characters.";

    if (!email) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      errors.email = "Invalid email format.";

    if (!password) errors.password = "Password is required.";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Validation failed.", errors });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });
    if (existingUser) {
      if (existingUser.email === email.toLowerCase())
        errors.email = "Email is already taken.";
      if (existingUser.username === username)
        errors.username = "Username is already taken.";
      return res.status(400).json({ message: "Validation failed.", errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      rating: user.rating,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "An unexpected server error occurred." });
  }
};

const login = async (req, res) => {
  try {
    
    const { email: identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Both username/email and password are required." });
    }

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        rating: user.rating,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid username/email or password." });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "An unexpected server error occurred." });
  }
};

module.exports = {
  signup,
  login,
};
