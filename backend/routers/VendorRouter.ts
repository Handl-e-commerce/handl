const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";
import {Vendor} from "../db/models/Vendor";
import jwt from "jsonwebtoken";
import * as VendorController from "../controllers/VendorController";

const vendorRouter = express.Router();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            return res.status(401).send({ error: "No access token found." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        
        if (!decoded) {
            return res.status(401).send({ error: "Invalid access token." });
        };
        (req as any).token = decoded;
        next();

    } catch (err: any) {
        return next(err as Error);
    }
};

// TODO: (HIGH) Add authentication middleware to this route
vendorRouter.get("/", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        // TODO: (LOW) Remove references for searchVal as we are no longer implementing the search bar
        let category: string | null = null;
        let subcategories: string[] | null = null;
        let states: string[] | null = null;
        if (req.query.category) {
            category = (req.query.category as string).trim();
        }
        if (req.query.subcategories) {
            subcategories = (req.query.subcategories as string).split(",")
                .map((subcategory) => subcategory.trim());
        }
        if (req.query.states) {
            states = (req.query.states as string).split(",")
                .map((subcategory) => subcategory.trim());
        }
        const searchVal: string = req.query["search-params"] as string;
        const vendorService: VendorService = new VendorService();
        const vendors: Vendor[] = (
            await vendorService.GetVendors(category, subcategories, searchVal, states)
        ).map((row) => row);

        return res.status(200).json({
            result: vendors,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

vendorRouter.get("/categories", VendorController.GetCategories);

vendorRouter.get("/subcategories", VendorController.GetSubcategories);

export {vendorRouter};
