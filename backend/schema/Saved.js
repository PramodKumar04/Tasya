const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User.js");
const Posts = require("./Posts.js");

const savedSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:'Posts'
    },
    savedAt:{
        type:Date,
        default: Date.now()
    }
});

const Saved = mongoose.model('Saved', savedSchema);
module.exports = Saved;