const CommentModal = require("../models/commentModal");
const { common500Error, findCommentById } = require("../utils/helper");

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
      const { commentId } = request.params;
      const userId = request.userId;

      // Use the findCommentById helper function
      let existComment = await findCommentById(commentId, response);
      if (!existComment) return;

      // Check if the user is the author of the comment
      if (existComment.createdBy.toString() !== userId) {
        return response.status(403).json({ message: "Access denied" });
      }

      let deletedComment = await existComment.deleteOne();

      if (deletedComment) {
        return response.status(200).json({
          message: "Comment details succesfully deleted",
          deletedComment,
        });
      }
    } catch (error) {
      return common500Error(error, response);
    }
  },
  getCommentById: async (request, response) => {
    try {
      const { commentId } = request.params;

      if (!commentId) {
        return response.status(400).json({ message: "commentId missing" });
      }

      let existComment = await findCommentById(commentId, response);
      if (!existComment) return;
      return response
        .status(200)
        .json({ message: "Comment details fetched", existComment });
    } catch (error) {
      return common500Error(error, response);
    }
  },
  getAllComments: async (request, response) => {
    try {
      const { localIssueId } = request.params;
      if (!localIssueId) {
        return response.status(400).json({ message: "localIssue Id missing" });
      }

      const localIssueComments = CommentModal.find({
        localIssue: localIssueId,
      });
      return response
        .status(200)
        .json({ message: "All comments details fetched", localIssueComments });
    } catch (error) {
      return common500Error(error, response);
    }
  },
};

module.exports = commentsController;
