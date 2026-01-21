require("dotenv").config({ override: true });

console.log("MONGO_URI =", process.env.MONGO_URI);


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy= require("passport-local");

//flash
const flash =require("connect-flash");

const { userModel } = require("./models/User.js");

const postRouter = require('./routes/Posts');
const userRouter = require('./routes/Users.js');

const sessionOptions={secret:"tasyasecret", resave:false,saveUninitialized:false,
                      cookie:{
                        expires: Date.now()+7*24*60*60*1000,
                        maxAge: 7*24*60*60*1000,
                        httpOnly: true
                      }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error("MongoDB connection error:", err));


// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(flash());

// Routes
app.use('/api', postRouter);
app.use('/api/users', userRouter);

// REMOVED THE DUPLICATE /api/session-info ROUTE
// It's now handled in the userRouter

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});