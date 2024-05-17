const localIssueController = require("../controllers/localIssueController");

const localIssueRouter = require("express").Router();

localIssueRouter.post("/createIssue", localIssueController.createIssue);
localIssueRouter.put(
  "/update/:localIssueId",
  localIssueController.updateLocalIssue
);

module.exports = localIssueRouter;
