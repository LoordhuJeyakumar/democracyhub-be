const usersController = require("../controllers/usersController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const usersRouter = require("express").Router();
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:userId", authMiddleware.verifyAccesToken, usersController.updateUserById);
usersRouter.post("/login", usersController.login);
usersRouter.get("/:userId", usersController.retrieveUser);
usersRouter.get(
  "/verify/:userId/:verifyToken",

  usersController.verifyActivationToken
);
usersRouter.get(
  "/resetPassword/:userId/:resetToken",
  usersController.verifyResetToken
);
usersRouter.post(
  "/sendVerificationLink",
  usersController.reSendVerificationLink
);
usersRouter.post("/resetPasswordLink", usersController.resetPasswordLink);
usersRouter.post("/resetPassword/:userId", usersController.resetPassword);

module.exports = usersRouter;
