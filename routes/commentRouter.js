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
commentRouter.delete(
  "/:commentId",
  authMiddleware.verifyAccesToken,
  commentsController.getCommentById
);
module.exports = commentRouter;
