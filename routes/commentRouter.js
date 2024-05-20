const commentsController = require("../controllers/commentController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const commentRouter = require("express").Router();

commentRouter.post(
  "/createComment/:localIssue",
  authMiddleware.verifyAccesToken,
  commentsController.createComment
);
commentRouter.put(
  "/updateComment/:commentId",
  authMiddleware.verifyAccesToken,
  commentsController.createComment
);
commentRouter.delete(
  "/delete/:commentId",
  authMiddleware.verifyAccesToken,
  commentsController.deleteCommentById
);
commentRouter.get(
  "/:commentId",
  authMiddleware.verifyAccesToken,
  commentsController.getCommentById
);
commentRouter.get(
  "/:localIssueId",
  authMiddleware.verifyAccesToken,
  commentsController.getAllComments
);
commentRouter.post(
  "/upVote/:commentId",
  authMiddleware.verifyAccesToken,
  commentsController.upvoteComment
);
commentRouter.post(
  "/downVote/:commentId",
  authMiddleware.verifyAccesToken,
  commentsController.downvoteComment
);
module.exports = commentRouter;
