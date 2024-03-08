// backend/db.js
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI);

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    is_verified: {
      type: Boolean,
      default:false
  },

});


const postSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});


const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post"},
    user: { type: Schema.Types.ObjectId, ref: "User"},
  },
  { timestamps: true }
)

const replySchema = new Schema(
  {
    comment:{type : String},
    reply: {type: Schema.Types.ObjectId , ref: "Comment"}
  }
)


const passwordResetSchema = new mongoose.Schema({
  user_id: {
      type: String,
      required: true,
      ref:'User'
  },
  token: {
      type: String,
      required: true,
  },

});


const Post = mongoose.model('Post', postSchema);

const User = mongoose.model('User', userSchema);
const Comment = mongoose.model('commentSchema', userSchema);

const PasswordReset = mongoose.model('PasswordReset',passwordResetSchema)
module.exports = {
	User,
    Post,
    PasswordReset
};