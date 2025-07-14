const mongoose = require("mongoose");
const postSchema = require("../schema/Posts");

const postModel = mongoose.model("Post", postSchema);
module.exports = { postModel };


