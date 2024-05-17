const constituencyController = require("../controllers/constituencyController");

const constituencyRouter = require("express").Router();
constituencyRouter.post("/create", constituencyController.createConstituency);
constituencyRouter.put(
  "/update/:constituencyId",
  constituencyController.updateConstituencyById
);
constituencyRouter.delete(
  "/delete/:constituencyId",
  constituencyController.deleteConstituencyById
);
constituencyRouter.get("/", constituencyController.getAllConstituencies);
constituencyRouter.get(
  "/:constituencyId",
  constituencyController.getConstituencyById
);
module.exports = constituencyRouter;
