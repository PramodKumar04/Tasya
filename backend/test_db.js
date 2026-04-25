const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/tasya").then(async () => {
  const User = require("./schema/User.js");
  const users = await User.find().populate("followers").populate("following");
  console.log(JSON.stringify(users, null, 2));
  process.exit(0);
});
