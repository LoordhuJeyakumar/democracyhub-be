const constituencyController = require("../controllers/constituencyController");

const constituencyRouter = require("express").Router();
constituencyRouter.post("/create", constituencyController.createConstituency);
module.exports = constituencyRouter;
