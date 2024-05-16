const localIssueController = require("../controllers/localIssueController");

const localIssueRouter = require("express").Router();

localIssueRouter.post("/createIssue", localIssueController.createIssue);
module.exports = localIssueRouter;
