const express = require("express");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { body } = require("express-validator");
const { loginLimiter } = require("../middleware/rateLimit");
const controller = require("../controllers/authController");

const router = express.Router();

// Signup with validation
router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("name").notEmpty(),
  ],
  controller.signup
);

// Login with rate limiting
router.post("/login", loginLimiter, controller.login);

// Refresh token
router.get("/refresh", controller.refreshToken);

// Admin-only user creation
router.post(
  "/create-user",
  auth,
  role("admin"),
  controller.createUser
);

module.exports = router;
