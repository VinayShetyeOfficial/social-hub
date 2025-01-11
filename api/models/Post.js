const mongoose = require("mongoose");

// Define the schema for Post model
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, // Each post must have an associated user
    },
    desc: {
      type: String,
      max: 500, // Maximum description length
    },
    img: {
      type: String, // URL or path to the image
    },
    likes: {
      type: Array,
      default: [], // Array of user IDs who liked the post
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

// Export the Post model
module.exports = mongoose.model("Post", PostSchema);
