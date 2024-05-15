const electionController = require("../controllers/electionController");

const electionRouter = require("express").Router();

electionRouter.get("/", electionController.getAllElectionDetails);
electionRouter.post("/createElection", electionController.createElection);
electionRouter.put(
  "/update/:electionId",
  electionController.updateElectionDetails
);
electionRouter.get("/:electionId", electionController.getElectionDetails);
module.exports = electionRouter;
