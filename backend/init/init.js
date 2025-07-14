
const mongoose = require('mongoose');
const initdata = require('./posts.js');
const { postModel } = require('../models/Posts.js'); 

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tasya');
    console.log("✅ Connected to MongoDB");

    await postModel.deleteMany({});
    console.log("🗑 Existing posts deleted");

    await postModel.insertMany(initdata.data);
    console.log("✅ New posts inserted");

    await mongoose.connection.close();
    console.log("🔒 Connection closed");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();
