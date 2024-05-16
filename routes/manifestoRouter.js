const manifestoController = require("../controllers/manifestoController");

const manifestoRouter = require("express").Router();

manifestoRouter.post("/createManifesto", manifestoController.createManifesto);
manifestoRouter.put(
  "/update/:manifestoId",
  manifestoController.updateManifesto
);
manifestoRouter.delete(
  "/delete/:manifestoId",
  manifestoController.deleteManifesto
);
manifestoRouter.get("/:manifestoId", manifestoController.getManifestoById);
manifestoRouter.get("/", manifestoController.getAllManifestosDetails);

module.exports = manifestoRouter;
