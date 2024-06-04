const electionController = require("../controllers/electionController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const electionRouter = require("express").Router();

electionRouter.get("/", electionController.getAllElectionDetails);
electionRouter.post("/createElection", adminAuthMiddleware, electionController.createElection);
electionRouter.put(
  "/update/:electionId",adminAuthMiddleware,
  electionController.updateElectionDetails
);
electionRouter.get("/:electionId", electionController.getElectionDetails);
electionRouter.get("/type/:electionType", electionController.getElectionByType);
electionRouter.delete(
  "/delete/:electionId",adminAuthMiddleware,
  electionController.deleteElectionById
);
module.exports = electionRouter;
