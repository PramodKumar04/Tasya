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
    content: {
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;