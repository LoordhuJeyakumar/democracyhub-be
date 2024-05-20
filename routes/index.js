const { authMiddleware } = require("../middlewares/authMiddleware");
const commentRouter = require("./commentRouter");
const constituencyRouter = require("./constituencyRouter");
const electionRouter = require("./electionRouter");
const localIssueRouter = require("./localIssueRouter");
const manifestoRouter = require("./manifestoRouter");
const partiesRouter = require("./partiesRouter");
const usersRouter = require("./usersRoutes");

const appRouter = require("express").Router();

appRouter.use("/users", usersRouter);
appRouter.use("/elections", electionRouter);
appRouter.use("/parties", partiesRouter);
appRouter.use("/manifestos", manifestoRouter);
appRouter.use("/localIssues", localIssueRouter);
appRouter.use(
  "/localIssues/comments",
  commentRouter
);
appRouter.use("/constituencies", constituencyRouter);

module.exports = appRouter;
