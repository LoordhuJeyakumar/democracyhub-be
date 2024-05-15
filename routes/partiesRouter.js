const partiesController = require("../controllers/partiesController");

const partiesRouter = require("express").Router();

partiesRouter.get("/", partiesController.getAllPartyDetails);
partiesRouter.post("/createParty", partiesController.createParty);
partiesRouter.put("/update/:partyId", partiesController.updatePartyDetails);
partiesRouter.get("/:partyId", partiesController.getPartyDetails);

partiesRouter.delete("/delete/:partyId", partiesController.deletePartyById);

module.exports = partiesRouter;
