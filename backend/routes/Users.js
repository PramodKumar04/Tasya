const express = require("express");
const router = express.Router();
const { userModel } = require("../models/User.js");

const passport= require("passport");
const { cloudinary, upload } = require("../cloudConfig.js");

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

    // Create new user object with normalized email
    const normalizedEmail = email.toLowerCase().trim();
    const newUser = new userModel({ email: normalizedEmail, username });

    // Register the user with hashed password
    const registeredUser = await userModel.register(newUser, password);

    // Login the user
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      // Send only safe user data
      const safeUser = {
        _id: registeredUser._id,
        username: registeredUser.username,
        email: registeredUser.email,
        interests: registeredUser.interests,
        followers: registeredUser.followers,
        following: registeredUser.following,
        createdAt: registeredUser.createdAt
      };
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Signup successful but session failed" });
        }
        return res.status(200).json({ message: "Welcome to Tasya!", user: safeUser });
      });
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res, next) => {
  const { username } = req.body;
  console.log("Login attempt with:", username);

  // Check if the input is an email
  if (username && username.includes("@")) {
    try {
      const emailQuery = username.trim();
      console.log("Searching for user with email:", emailQuery);
      // Case-insensitive search to support users registered before normalization
      const userByEmail = await userModel.findOne({ 
        email: { $regex: new RegExp(`^${emailQuery}$`, "i") } 
      });
      
      if (userByEmail) {
        console.log("User found by email, using username:", userByEmail.username);
        req.body.username = userByEmail.username;
      } else {
        console.log("No user found with that email.");
      }
    } catch (err) {
      console.error("Error finding user by email:", err);
    }
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Passport auth error:", err);
      return next(err);
    }

    if (!user) {
      console.log("Login failed info:", info);
      return res.status(401).json({ message: info ? info.message : "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Error in req.login:", err);
        return res.status(500).json({ message: "Login failed" });
      }

      console.log("User successfully logged in:", user.username);
      console.log("Session ID after login:", req.sessionID);
      
      const safeUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        interests: user.interests,
        followers: user.followers,
        following: user.following,
        createdAt: user.createdAt
      };
      req.session.save((err) => {
        if (err) {
          console.error("Session save error during login:", err);
          return res.status(500).json({ message: "Login successful but session failed" });
        }
        return res.status(200).json({ message: "Login successful!", user: safeUser });
      });
    });
  })(req, res, next);
});

//LOGOUT
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log("Logout error:", err);
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ message: "Could not logout." });
      }
      
      console.log("User logged out.");
      return res.status(200).json({ message: "Logout successful!" });
    });
  });
});


router.get("/session-info", (req, res) => {
  console.log("Session check - Is Authenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("Session user:", req.user.username);
    return res.json({ user: req.user });
  } else {
    console.log("Session - No authenticated user found.");
    return res.json({ user: null });
  }
});

// GET USER PROFILE
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.params.username })
      .populate("followers", "username profileImage")
      .populate("following", "username profileImage");
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // Count posts by this user
    const { postModel } = require("../models/Posts"); 
    const postCount = await postModel.countDocuments({ author: user._id });

    // Create a plain object to add extra fields
    const userObj = user.toObject();
    userObj.postCount = postCount;

    res.json(userObj);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// UPDATE PROFILE
router.patch("/update", upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "backgroundImage", maxCount: 1 }
]), async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await userModel.findById(req.user._id);
    const { bio, interests } = req.body;

    if (bio) user.bio = bio;
    if (interests) user.interests = JSON.parse(interests);

    // Handle Profile Image
    if (req.files?.profileImage?.[0]) {
      const file = req.files.profileImage[0];
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(base64, { folder: "tasya_dev/profiles" });
      user.profileImage = { url: result.secure_url, filename: result.public_id };
    }

    // Handle Background Image
    if (req.files?.backgroundImage?.[0]) {
      const file = req.files.backgroundImage[0];
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(base64, { folder: "tasya_dev/backgrounds" });
      user.backgroundImage = { url: result.secure_url, filename: result.public_id };
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// FOLLOW USER
router.post("/follow/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log("Follow attempt blocked: Not authenticated");
    return res.status(401).json({ message: "You must be logged in to follow users." });
  }
  try {
    const targetId = req.params.id;
    const currentUserId = req.user._id;

    if (currentUserId.toString() === targetId) {
      return res.status(400).json({ message: "Cannot follow yourself" });
    }

    await userModel.findByIdAndUpdate(targetId, {
      $addToSet: { followers: currentUserId }
    });
    
    await userModel.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetId }
    });

    res.json({ message: "Followed successfully" });
  } catch (err) {
    console.error("Error following user:", err);
    res.status(500).json({ message: "Error following user" });
  }
});

// UNFOLLOW USER
router.post("/unfollow/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log("Unfollow attempt blocked: Not authenticated");
    return res.status(401).json({ message: "You must be logged in to unfollow users." });
  }
  try {
    const targetId = req.params.id;
    const currentUserId = req.user._id;

    await userModel.findByIdAndUpdate(targetId, {
      $pull: { followers: currentUserId }
    });
    
    await userModel.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetId }
    });

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    console.error("Error unfollowing user:", err);
    res.status(500).json({ message: "Error unfollowing user" });
  }
});
// SEARCH USERS
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") return res.json([]);
    
    const users = await userModel.find({
      username: { $regex: q, $options: "i" }
    })
    .select("username profileImage bio followers")
    .limit(10);
    
    res.json(users);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Error searching users" });
  }
});

module.exports = router;