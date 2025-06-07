const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";
import {VerificationService} from "../services/VerificationService";
import {Vendor} from "../db/models/Vendor";

const vendorRouter = express.Router();

vendorRouter.get("/categories/:category", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        const verificationService = new VerificationService();
        const verificationStatus = await verificationService.VerifyUser(
            cookies.selector,
            cookies.validator,
            cookies.userId
        );

        const category = req.query.category ? (req.query.category as string).trim() : req.params.category;
        if (!category) {
            return res.status(400).json({error: "Category is required"});
        }

        const subcategories = req.query.subcategories ?
            (req.query.subcategories as string).split(",").map((s) => s.trim()) :
            null;
        const states = req.query.states ?
            (req.query.states as string).split(",").map((s) => s.trim()) :
            null;

        const vendorService = new VendorService();
        // TODO: (HIGH) Remove the !isVerified check and check instead for user type + expiration
        // if null or type != premium or expiration date < time.now(), then return query with 5 results
        // if type == premium, then return query with all results
        // Just return limit 5 results if not premium or expired
        const isPremium =
            verificationStatus.result &&
            verificationStatus.type === "premium" &&
            new Date(verificationStatus.subscriptionExpirationDate as Date) > new Date();

        const limit = isPremium ? undefined : 5;
        const vendors: Vendor[] = await vendorService.GetVendors(category, subcategories, states, limit);

        return res.status(200).json({result: vendors});
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
