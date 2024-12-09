const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";
import {VerificationService} from "../services/VerificationService";

const vendorRouter = express.Router();

vendorRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        const verificationService: VerificationService = new VerificationService();
        const isVerified: boolean = await verificationService.VerifyUser(
            cookies.selector,
            cookies.validator,
            cookies.userId
        );
        if (!isVerified) {
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
        let categories = null;
        let states = null;
        if (req.query.categories) {
            categories = (req.query.categories as string).split(",");
        }
        if (req.query.states) {
            states = (req.query.states as string).split(",");
        }
        console.log(categories);
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
