const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";
import {VerificationService} from "../services/VerificationService";
import {Vendor} from "../db/models/Vendor";

const vendorRouter = express.Router();

vendorRouter.get("/categories/:category", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: (LOW) Remove references for searchVal as we are no longer implementing the search bar
        const cookies = req.cookies;
        const verificationService: VerificationService = new VerificationService();
        const isVerifiedResult = await verificationService.VerifyUser(
            cookies.selector,
            cookies.validator,
            cookies.userId
        );

        // TODO: (HIGH) Remove the !isVerified check and check instead for user type + expiration
        // if null or type != premium or expiration date < time.now(), then return query with 5 results
        // if type == premium, then return query with all results

        let category: string | null = req.params.category;
        if (!category) {
            return res.status(400).json({
                error: "Category is required",
            });
        }
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

vendorRouter.get("/subcategories", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendorService: VendorService = new VendorService();
        let category = null;
        if (req.query.category) {
            category = (req.query.category as string);
        }
        const subcategories = await vendorService.GetSubCategories((category as string).trim());
        return res.status(200).json({
            result: subcategories,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {vendorRouter};
