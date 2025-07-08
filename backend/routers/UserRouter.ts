const express = require("express");
import UserController from "../controllers/UserController";

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", UserController.CreateUser);

userRouter.get("/me", UserController.GetMe);

userRouter.get("/me/vendors", UserController.GetMeVendors);

userRouter.put("/:id/password", UserController.UpdatePassword);

userRouter.post("/password/reset/verify", UserController.VerifyPasswordResetToken);

userRouter.post("/password/reset/request", UserController.RequestPasswordReset);

userRouter.post("/login", UserController.Login);

userRouter.post("/logout", UserController.Logout);

userRouter.post("/registration/verify", UserController.VerifyRegistrationToken);

userRouter.post("/registration/verify/new-token", UserController.RequestNewRegistrationToken);

userRouter.put("/delete/:id", UserController.DeleteUser);

userRouter.post("/contact", UserController.Contact);

userRouter.post("/recaptcha/verify", UserController.VerifyRecaptcha);

userRouter.put("/vendors/save", UserController.SaveVendors);

export {userRouter};
