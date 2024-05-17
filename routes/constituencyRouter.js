const constituencyController = require("../controllers/constituencyController");

const constituencyRouter = require("express").Router();
constituencyRouter.post("/create", constituencyController.createConstituency);
constituencyRouter.put(
  "/update/:constituencyId",
  constituencyController.updateConstituencyById
);
module.exports = constituencyRouter;
