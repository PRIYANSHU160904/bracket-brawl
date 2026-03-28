const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getUserMatches,
  getUserSubmissions,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/profile", protect, getUserProfile);
router.get("/matches", protect, getUserMatches);
router.get("/submissions", protect, getUserSubmissions);

module.exports = router;
