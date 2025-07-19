if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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
console.log(process.env.CLOUD_NAME, process.env.CLOUD_API_KEY, process.env.CLOUD_API_SECRET);

const sessionOptions={secret:"tasyasecret", resave:false,saveUninitialized:true,
                      cookie:{
                        expires: Date.now()+7*24*60*60*1000,
                        maxAge: 7*24*60*60*1000,
                        httpOnly: true
                      }
};



// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tasya')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB Error:", err));

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

app.get('/api/session-info', (req, res) => {
  res.json({
    user: req.user || null,
    success: req.flash("success"),
    error: req.flash("error")
  });
});



// Routes
app.use('/api', postRouter);

app.use('/api/users', userRouter);


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});