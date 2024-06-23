const express = require("express");
import {NextFunction, Request, Response} from "express";
import { VendorService } from "../services/VendorService";

const vendorRouter = express.Router();

vendorRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let categories: string = req.query.categories as string;
        let searchVal: string = req.query.searchVal as string;
        let vendorService: VendorService = new VendorService();
        let vendors = await vendorService.GetVendors(categories.split(","), searchVal);
        return res.status(200).json({
            result: vendors
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {vendorRouter};
