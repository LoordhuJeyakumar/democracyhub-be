const usersRouter = require("./usersRoutes");

const appRouter = require("express").Router();

appRouter.use("/users", usersRouter);

module.exports = appRouter;
