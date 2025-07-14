const { model } = require("mongoose");
const { commentSchema } = require("../schema/Comments.js");

const commentModel = model("Comments", commentSchema);

module.exports = { commentModel };
