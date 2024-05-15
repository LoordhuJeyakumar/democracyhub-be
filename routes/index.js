const electionRouter = require("./electionRouter");
const usersRouter = require("./usersRoutes");

const appRouter = require("express").Router();

appRouter.use("/users", usersRouter);
appRouter.use("/elections", electionRouter);

module.exports = appRouter;
