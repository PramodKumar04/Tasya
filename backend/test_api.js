const axios = require('axios');
const mongoose = require('mongoose');

async function testFollowApi() {
  try {
    // 1. connect to db to get test users
    await mongoose.connect("mongodb://127.0.0.1:27017/tasya");
    const User = require("./schema/User.js"); // wait, path is ../models/User.js based on Users.js
    // let me just try direct mongo
    const users = await mongoose.connection.db.collection('users').find().limit(2).toArray();
    
    if (users.length < 2) {
      console.log("Need 2 users");
      return;
    }
    
    const user1 = users[0];
    const user2 = users[1];
    
    // We can't log in easily without password. Let me just check if the route returns 401.
    // Actually, I can just login if I create a test user or set a known password.
    // Let's just create a test user.
    const testUsername = "test_follow_user_" + Date.now();
    
    // Register
    const api = axios.create({ baseURL: 'http://localhost:5000', withCredentials: true });
    
    // axios doesn't persist cookies automatically in node, need cookie-jar
    // but we can just use the mongo script we already verified!
    // The issue MUST be CORS or network, OR it's still running old code.
  } catch (err) {
    console.error(err);
  }
}
testFollowApi();
