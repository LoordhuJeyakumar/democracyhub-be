const mongoose = require("mongoose");

// Define the schema for the 'comments' collection in MongoDB
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    localIssue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocalIssue",
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },

  {
    timestamps: true, // Enable timestamps (createdAt, updatedAt) for the schema
  }
);

// Create the Comment model using the commentSchema
const CommentModal = mongoose.model("Comment", commentSchema, "comments");

// Exporting the Comment model
module.exports = CommentModal;
