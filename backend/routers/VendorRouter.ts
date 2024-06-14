const express = require("express");
import {NextFunction, Request, Response} from "express";

const vendorRouter = express.Router();

vendorRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json();
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {vendorRouter};
