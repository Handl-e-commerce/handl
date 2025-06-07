const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";
import {VerificationService} from "../services/VerificationService";
import {Vendor} from "../db/models/Vendor";
import {UserType} from "../enums/UserType";

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
        const isPremium = verificationStatus.result && verificationStatus.type === UserType[1] &&
            // There might be a timezone issue here but will deal with this in the future     
            new Date(verificationStatus.subscriptionExpirationDate as Date) > new Date();

        const limit = isPremium ? undefined : 5;
        const vendors: Vendor[] = await vendorService.GetVendors(category, subcategories, states, limit);

        return res.status(200)
            .cookie("type", verificationStatus.type, {
                expires: new Date(Date.now() + (1000*60*60*24*90)),
                sameSite: "none",
                secure: true,
                httpOnly: false,
            })
            .json({result: vendors});
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
