const {model}= require("mongoose");
const {userSchema}=require("../schema/User");
const userModel = model("User",userSchema);
 module.exports ={userModel};
