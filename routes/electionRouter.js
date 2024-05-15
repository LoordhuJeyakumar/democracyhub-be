const electionController = require("../controllers/electionController");

const electionRouter = require("express").Router();

electionRouter.get("/", electionController.getElectionDetails);
electionRouter.post("/createElection", electionController.createElection);
electionRouter.put(
  "/update/:electionId",
  electionController.updateElectionDetails
);

module.exports = electionRouter;
