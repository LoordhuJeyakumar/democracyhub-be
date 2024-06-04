const candidateController = require("../controllers/candidateController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

const candidateRouter = require("express").Router();

candidateRouter.post(
  "/create",
  adminAuthMiddleware,
  candidateController.createCandidate
);
candidateRouter.delete(
  "/delete/:candidateId",
  adminAuthMiddleware,
  candidateController.deleteCandidate
);

candidateRouter.put(
  "/update/:candidateId",
  adminAuthMiddleware,
  candidateController.updateCandidate
);

candidateRouter.get("/", candidateController.getAllCandidates);
candidateRouter.get("/:candidateId", candidateController.getCandidate);

module.exports = candidateRouter;
