require("dotenv").config({ override: true });



const express = require('express');
const app = express();

// Trust proxy for session cookies in production (Render, Heroku, etc.)
app.set('trust proxy', 1);
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
const aiRouter = require('./routes/AI.js');

console.log("Environment:", process.env.NODE_ENV || "development");

const isProduction = process.env.NODE_ENV === "production" || !!process.env.RENDER;

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "tasyasecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax"
  },
  proxy: isProduction
};

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error("MongoDB connection error:", err));


// Middlewares
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://tasya-creativehub.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`${req.method} ${req.url} - Auth: ${req.isAuthenticated()} - User: ${req.user ? req.user.username : 'none'}`);
    if (req.headers.cookie) console.log("Cookies present:", req.headers.cookie.substring(0, 30) + "...");
  }
  next();
});

passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(flash());

// Routes
app.use('/api', postRouter);
app.use('/api/users', userRouter);
app.use('/api/ai', aiRouter);

// REMOVED THE DUPLICATE /api/session-info ROUTE
// It's now handled in the userRouter

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
