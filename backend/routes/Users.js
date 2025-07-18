const express = require("express");
const router = express.Router();
const { userModel } = require("../models/User.js");

const passport= require("passport");

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

// LOGIN ROUTE
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      console.log("Login failed:", info.message); // Log failure reason
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Error in req.login:", err);
        return res.status(500).json({ message: "Login failed" });
      }

      console.log("User logged in:", user); // 👈 Shows logged-in user in console
      return res.status(200).json({ message: "Login successful!", user });
    });
  })(req, res, next);
});

// router.post("/login",passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), async(req, res)=>{
//   const {username}= req.body;

// res.status(200).json({ message: "Welcome to Tasya!", user: username});

// })


//LOGOUT 
// router.get("/logout", (req, res, next)=>{
//   req.logout((err)=>{
//     if(err){
//       console.log(err);
//       next(err);


//     }
//     console.log("logged out");
    
//     return res.status(200).json({ message: "Logout successful!"});

    

//   });
// })


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


module.exports = router;
