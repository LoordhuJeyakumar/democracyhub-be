const localIssueRouter = require("express").Router();
const multer = require("multer");
const localIssueController = require("../controllers/localIssueController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const storage = multer.memoryStorage();
const upload = multer({ storage });

localIssueRouter.post(
  "/createIssue",
  authMiddleware.verifyAccesToken,
  upload.array("photos", 10),
  localIssueController.createIssue
);

localIssueRouter.put(
  "/update/:localIssueId",
  authMiddleware.verifyAccesToken,
  localIssueController.updateLocalIssue
);
localIssueRouter.delete(
  "/delete/:localIssueId",
  authMiddleware.verifyAccesToken,
  localIssueController.deleteIssueById
);

localIssueRouter.get("/:localIssueId", localIssueController.getIssueById);
localIssueRouter.get("/", localIssueController.getAllIssues);
localIssueRouter.put(
  "/upVote/:localIssueId",
  authMiddleware.verifyAccesToken,
  localIssueController.upVoteIssue
);
localIssueRouter.put(
  "/downVote/:localIssueId",
  authMiddleware.verifyAccesToken,
  localIssueController.downVoteIssue
);

module.exports = localIssueRouter;
