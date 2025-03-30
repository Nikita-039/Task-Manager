const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware"); // Import the correct middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile); // ✅ Protect this route

module.exports = router;
