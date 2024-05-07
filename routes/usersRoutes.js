const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

const usersRouter = require("express").Router();

usersRouter.post("/", usersController.createUser);
usersRouter.post("/login", usersController.login);
usersRouter.get(
  "/:userId",
  authMiddleware.verifyAccesToken,
  usersController.retrieveUser
);

module.exports = usersRouter;
