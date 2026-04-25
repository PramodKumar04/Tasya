const mongoose = require("mongoose");
const { userModel } = require("./schema/User"); // Check correct path!

// Let's connect and test
mongoose.connect("mongodb://127.0.0.1:27017/tasya").then(async () => {
   try {
     // I need to use the actual model from the schema
     // wait, in backend/routes/Users.js: const userModel = require("../schema/User.js");
     // Let me do require("./schema/User.js")
     const User = require("./schema/User.js");
     
     const users = await User.find().limit(2);
     if (users.length < 2) {
       console.log("Need at least 2 users to test follow.");
       process.exit(1);
     }
     
     const user1 = users[0];
     const user2 = users[1];
     
     console.log("Testing follow...");
     
     // Simulate what routes/Users.js does:
     await User.findByIdAndUpdate(user2._id, {
       $addToSet: { followers: user1._id }
     });
     
     await User.findByIdAndUpdate(user1._id, {
       $addToSet: { following: user2._id }
     });
     
     console.log("Follow simulation successful.");
     
     const updatedUser2 = await User.findById(user2._id);
     console.log("User2 followers:", updatedUser2.followers);
     
   } catch (err) {
     console.error("Simulation failed:", err);
   } finally {
     process.exit(0);
   }
});
