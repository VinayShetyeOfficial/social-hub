const mongoose = require("mongoose");

// Define the schema for User model
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true, // Ensures no duplicate usernames
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true, // Ensures no duplicate emails
    },
    password: {
      type: String,
      required: true,
      min: 6, // Minimum password length
    },
    profilePicture: {
      type: String,
      default: "", // Default value for profile picture
    },
    coverPicture: {
      type: String,
      default: "", // Default value for cover picture
    },
    followers: {
      type: Array,
      default: [], // Empty array for followers
    },
    followings: {
      type: Array,
      default: [], // Empty array for followings
    },
    isAdmin: {
      type: Boolean,
      default: false, // Default value is not an admin
    },
    desc: {
      type: String,
      max: 50, // Maximum length for description
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3], // 1: Single, 2: In a relationship, 3: Complicated
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

// Export the User model
module.exports = mongoose.model("User", UserSchema);
