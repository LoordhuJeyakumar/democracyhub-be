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
usersRouter.get(
  "/verify/:userId/:verifyToken",
  usersController.verifyActivationToken
);
usersRouter.post(
  "/sendVerificationLink",
  usersController.reSendVerificationLink
);
usersRouter.post("/resetPassword/:userId", usersController.resetPassword);

module.exports = usersRouter;
