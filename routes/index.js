const electionRouter = require("./electionRouter");
const manifestoRouter = require("./manifestoRouter");
const partiesRouter = require("./partiesRouter");
const usersRouter = require("./usersRoutes");

const appRouter = require("express").Router();

appRouter.use("/users", usersRouter);
appRouter.use("/elections", electionRouter);
appRouter.use("/parties", partiesRouter);
appRouter.use("/manifestos", manifestoRouter);

module.exports = appRouter;
