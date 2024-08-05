const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";

const vendorRouter = express.Router();

vendorRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let categories = null;
        if (req.query.categories) {
            categories = (req.query.categories as string).split(",");
        }
        const searchVal: string = req.query["search-params"] as string;
        const vendorService: VendorService = new VendorService();
        const vendors = await vendorService.GetVendors(categories, searchVal);
        return res.status(200).json({
            result: vendors,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {vendorRouter};
