const usersController = require("../controllers/usersController");
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const paginate = require("../middlewares/paginateMiddleware");
const UserModal = require("../models/userModal");

const usersRouter = require("express").Router();
usersRouter.post("/", usersController.createUser);
usersRouter.put(
  "/:userId",
  authMiddleware.verifyAccesToken,
  usersController.updateUserById
);
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
usersRouter.get(
  "/",
  adminAuthMiddleware,
  paginate(UserModal),
  usersController.getAllUsers
);

usersRouter.delete(
  "/:userId",
  adminAuthMiddleware,
  usersController.deleteUserByAdmin
);

module.exports = usersRouter;
