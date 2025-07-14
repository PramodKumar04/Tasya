const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.js");
const Posts = require("./Posts.js");

const commentSchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:'Posts'
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
});

const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;