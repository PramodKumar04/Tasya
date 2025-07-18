const express = require("express");
const router = express.Router();
const { userModel } = require("../models/User.js");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("REQ BODY:", req.body);

    // Check if email or username already exists
    const existingEmail = await userModel.findOne({ email });
    const existingUsername = await userModel.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Create new user object
    const newUser = new userModel({ email, username });

    // Register the user with hashed password
    const registeredUser = await userModel.register(newUser, password);

    // Login the user
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      return res.status(200).json({ message: "Welcome to Tasya!", user: registeredUser });
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

module.exports = router;
