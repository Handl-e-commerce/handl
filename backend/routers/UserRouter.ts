const express = require("express");
import {NextFunction, Request, Response} from "express";
import {IUserDetails} from "../interfaces/IUserDetails";
import {UserService} from "../services/UserService";
import {IGenericQueryResult} from "../interfaces/IGenericQueryResult";
import {User} from "../db/models/User";
import {Vendor} from "../db/models/Vendor";

const userRouter = express.Router();

userRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDetails: IUserDetails = req.body;
        const userService: UserService = new UserService();
        const result: IGenericQueryResult = await userService.CreateUser(userDetails);
        return res.status(201).json({
            message: result.message,
        });
    } catch (err: unknown) {
        const error = err as Error;
        return next(error);
    }
});

userRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        const userService: UserService = new UserService();
        const user: User = await userService.GetUserByUserId(userId);
        return res.status(200).json({
            user: user,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

userRouter.get("/:id/vendors", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        const userService: UserService = new UserService();
        const savedVendors: Vendor[] = await userService.GetSavedVendors(userId);
        return res.status(200).json({
            savedVendors: savedVendors,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

userRouter.put("/:id/password", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userService: UserService = new UserService();
        const result: IGenericQueryResult = await userService.ResetUserPassword(req.params.id, req.body.newPassword);
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

userRouter.post("/password/reset/request", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = req.body.email as string;
        const userService: UserService = new UserService();
        await userService.RequestUserPasswordReset(email);
        return res.status(201).send();
    } catch (err: unknown) {
        return next(err as Error);
    }
});

userRouter.post("/password/reset/verify", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.body.userId;
        const token: string = req.body.token;
        const userService: UserService = new UserService();
        const verificationResult: {
            result: boolean;
            message: string;
        } = await userService.VerifyToken(userId, token, true);
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

userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userDetails = req.body;
        const userService: UserService = new UserService();
        const loginStatus: {
            result: boolean;
            selector?: string | null | undefined;
            validator?: string | null | undefined;
            userId?: string | undefined;
            expires?: Date | null | undefined;
            firstName?: string | null | undefined,
        } = await userService.Login(userDetails.email, userDetails.password);
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
                    firstName: loginStatus.firstName
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
        const verificationResult: {
            result: boolean;
            message: string;
        } = await userService.VerifyToken(userId, token, false);
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

userRouter.put("/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.id;
        const userService: UserService = new UserService();
        const result: IGenericQueryResult = await userService.DeleteUser(userId);
        return res.status(200).json({
            id: result.id,
            message: result.message,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {userRouter};
