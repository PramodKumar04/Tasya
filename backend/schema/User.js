const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    profileImage: {
        url:String,
        filename:String,
    },
    interests:[
        {
            type:String,

        }
    ],
    bio:{
        type:String,
       
    },
    contact:{
        linkedin:String,
        gmail:String,
        twitter: String,
        facebook:String
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },



});

userSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model("User",userSchema);