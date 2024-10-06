const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";

const vendorRouter = express.Router();

vendorRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let categories = null;
        let states = null;
        if (req.query.categories) {
            categories = (req.query.categories as string).split(",");
        }
        if (req.query.states) {
            states = (req.query.states as string).split(",");
        }
        const searchVal: string = req.query["search-params"] as string;
        const vendorService: VendorService = new VendorService();
        const vendors = await vendorService.GetVendors(categories, searchVal, states);
        return res.status(200).json({
            result: vendors,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

vendorRouter.get("/categories", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorService: VendorService = new VendorService();
        const categories = await vendorService.GetCategories();
        return res.status(200).json({
            result: categories,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {vendorRouter};
