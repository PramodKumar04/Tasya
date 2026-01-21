const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.js");


const postSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    url: String,
    filename: String,
  },
  video: {
    url: String,
    filename: String,
  },
  category: {
    type: String,
    enum: ["blog", "vlogs", "art", "newsletter", "other", "review"],
    required: true,
  },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });

postSchema.index({
  title: "text",
  content: "text"
});


module.exports = postSchema;
