const express = require("express");
import {NextFunction, Request, Response} from "express";
import {IUserDetails} from "../interfaces/IUserDetails";
import {UserService} from "../services/UserService";

const userRouter = express.Router();

userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDetails: IUserDetails = req.body;
        console.log(userDetails);
        return res.status(201).json();
    } catch (err: unknown) {
        const error = err as Error;
        return next(error);
    }
});

userRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        console.log(userId);
        return res.status(200).json();
    } catch (err: unknown) {
        return next(err as Error);
    }
});

userRouter.put("/:id/password", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userService: UserService = new UserService();
        const result = await userService.UpdateUserPassword(req.params.id, req.body.oldPassword, req.body.newPassword);
        return res.status(201).json({
            message: result,
        });
    } catch (err: unknown) {
        res.status(401).json({
            message: (err as Error).message,
        });
        return next(err as Error);
    }
});

userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDetails = req.body;
        const userService: UserService = new UserService();
        const loginStatus = await userService.Login(userDetails.email, userDetails.password);
        if (loginStatus.result) {
            return res.status(201)
            .cookie("selector", loginStatus.selector, {
                expires: new Date(Date.now() + (1000*60*60*24*90)),
                sameSite: "none",
                secure: true,
                httpOnly: true,
              })
              .cookie("validator", loginStatus.validator, {
                expires: new Date(Date.now() + (1000*60*60*24*90)),
                sameSite: "none",
                secure: true,
                httpOnly: true,
              })
              .json({
                message: "Successfully authenticated user",
                userId: loginStatus.userId,
                loggedIn: "true",
                expires: new Date(Date.now() + (1000*60*60*24*90)),
              })
            ;
        } else {
            return res.status(401).json({
              message: "Unable to authenticate user",
            });
        }
    } catch (err: unknown) {
        return next(err as Error);
    }
});

userRouter.post("/login/verify", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        const userId: string = req.body.userId;
        const userService: UserService = new UserService();
        const isVerified: boolean = await userService.VerifyUser(cookies.selector, cookies.validator, userId);
        if (isVerified) {
            return res.status(201).send();
        } else {
            return res.status(401)
                .cookie("selector", "", {
                    maxAge: Number(new Date(1)),
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                })
                .cookie("validator", "", {
                    maxAge: Number(new Date(1)),
                    sameSite: "none",
                    secure: true,
                    httpOnly: true,
                })
                .send();
        }
    } catch (err: unknown) {
        return next(err as Error);
    }
});

userRouter.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;
      const userService: UserService = new UserService();
      await userService.Logout(cookies.selector);
      return res.status(201)
        .cookie("selector", "", {
          maxAge: Number(new Date(1)),
          sameSite: "none",
          secure: true,
          httpOnly: true,
        })
        .cookie("validator", "", {
          maxAge: Number(new Date(1)),
          sameSite: "none",
          secure: true,
          httpOnly: true,
        })
        .send();
    } catch (err: unknown) {
      return next(err as Error);
    }
  });
  
  userRouter.post("/registration/verify", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.body.userId;
      const token: string = req.body.token;
      const userService: UserService = new UserService();
      const verificationResult = await userService.VerifyRegistrationToken(userId, token);
      if (verificationResult.result) {
        return res.status(201).json({
          message: verificationResult.message,
        });
      } else {
        return res.status(401).json({
          message: verificationResult.message,
        });
      }
    } catch (err: unknown) {
      return next(err as Error);
    }
  });
  
userRouter.post("/registration/verify/new-token", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.body.userId;
      const userService: UserService = new UserService();
      await userService.SendNewVerificationToken(userId);
      return res.status(201).send();
    } catch (err: unknown) {
      return next(err as Error);
    }
});

export {userRouter};
