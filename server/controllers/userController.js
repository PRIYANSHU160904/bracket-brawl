const User = require("../models/User");
const Match = require("../models/Match");
const Submission = require("../models/Submission");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserMatches = async (req, res) => {
  try {
    
    const matches = await Match.find({ users: req.user._id })
      .populate("users", "username rating") 
      .populate("problem", "title difficulty") 
      .populate("winner", "username") 
      .sort({ createdAt: -1 }); 

    res.json(matches);
  } catch (error) {
    console.error("Get Matches Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserSubmissions = async (req, res) => {
  try {
    
    const submissions = await Submission.find({ user: req.user._id })
      .populate("problem", "title difficulty")
      .sort({ createdAt: -1 }); 

    res.json(submissions);
  } catch (error) {
    console.error("Get Submissions Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getUserProfile,
  getUserMatches,
  getUserSubmissions,
};
