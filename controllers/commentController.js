const CommentModal = require("../models/commentModal");

const findCommentById = async (commentId, response) => {
  try {
    let comment = await CommentModal.findById(commentId);
    if (!comment) {
      response.status(404).json({ message: "Comment does not exist" });
      return null;
    }
    return comment;
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "Internal Server Error", error: error.message });
    return null;
  }
};

const common500Error = (error, response) => {
  console.error(error);
  return response
    .status(500)
    .json({ error: "Internal Server Error", error: error.message });
};

const commentsController = {
  createComment: async (request, response) => {
    try {
      const { content } = request.body;
      const createdBy = request.userId;
      const { localIssue } = request.params;

      const existComment = await CommentModal.find({ content: content });

      if (existComment) {
        return response.status(409).json({
          message: `This Comment details already exists`,
        });
      }

      let newComment = await CommentModal({
        content,
        createdBy,
        localIssue,
      });

      let savedComment = await newComment.save();

      if (savedComment) {
        return response
          .status(201)
          .json({ message: "Comment created succesfully", savedComment });
      }
    } catch (error) {
      return common500Error(error, response);
    }
  },
  updateComment: async (request, response) => {
    try {
      const { commentId } = request.params;
      const { content } = request.body;
      const userId = request.userId;

      // Check if content is provided
      if (!content) {
        return response.status(400).json({ message: "Content is required" });
      }

      // Use the findCommentById helper function
      let existComment = await findCommentById(commentId, response);
      if (!existComment) return;

      // Check if the user is the author of the comment
      if (existComment.createdBy.toString() !== userId) {
        return response.status(403).json({ message: "Access denied" });
      }

      existComment.content = content;
      let updatedComment = await existComment.save();

      if (updatedComment) {
        return response.json({
          message: "Comment updated successfully",
          updatedComment,
        });
      }
    } catch (error) {
      return common500Error(error, response);
    }
  },

  deleteCommentById: async (request, response) => {
    try {
        
    } catch (error) {
        
    }
  },
};

module.exports = commentsController;
