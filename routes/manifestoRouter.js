const manifestoController = require("../controllers/manifestoController");

const manifestoRouter = require("express").Router();

manifestoRouter.post("/createManifesto", manifestoController.createManifesto);
manifestoRouter.put(
  "/update/:manifestoId",
  manifestoController.updateManifesto
);

module.exports = manifestoRouter;
