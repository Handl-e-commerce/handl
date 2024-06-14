const express = require("express");
import {NextFunction, Request, Response} from "express";
import {IUserDetails} from "../interfaces/IUserDetails";

const userRouter = express.Router();

userRouter.post("/create", async (req: Request, res: Response, next: NextFunction) => {
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

export {userRouter};
