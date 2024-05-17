const localIssueController = require("../controllers/localIssueController");

const localIssueRouter = require("express").Router();

localIssueRouter.post("/createIssue", localIssueController.createIssue);
localIssueRouter.put(
  "/update/:localIssueId",
  localIssueController.updateLocalIssue
);
localIssueRouter.delete(
  "/delete/:localIssueId",
  localIssueController.deleteIssueById
);

localIssueRouter.get("/:localIssueId", localIssueController.getIssueById);
localIssueRouter.get("/", localIssueController.getAllIssues);
localIssueRouter.put("/upVote/:localIssueId", localIssueController.upVoteIssue);
localIssueRouter.put("/downVote/:localIssueId", localIssueController.upVoteIssue);

module.exports = localIssueRouter;
