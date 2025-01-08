const express = require("express");
import {NextFunction, Request, Response} from "express";
import {VendorService} from "../services/VendorService";
import {VerificationService} from "../services/VerificationService";
import {Vendor} from "../db/models/Vendor";

const vendorRouter = express.Router();
const project: string = 'handl-425522';
const globalLogFields: any = {};

vendorRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: (LOW) Remove references for searchVal as we are no longer implementing the search bar
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
        let category: string | null = null;
        let subcategories: string[] | null = null;
        let states: string[] | null = null;
        if (req.query.category) {
            category = (req.query.category as string);
        }
        if (req.query.subcategories) {
            subcategories = (req.query.subcategories as string).split(",");
        }
        if (req.query.states) {
            states = (req.query.states as string).split(",");
        }
        const searchVal: string = req.query["search-params"] as string;
        const vendorService: VendorService = new VendorService();
        const vendors: Vendor[] = (
            await vendorService.GetVendors(category, subcategories, searchVal, states)
        ).map((row) => row);
        
        if (typeof req !== 'undefined') {
            const traceHeader = req.header('X-Cloud-Trace-Context');
            if (traceHeader && project) {
              const [trace] = traceHeader.split('/');
              globalLogFields['logging.googleapis.com/trace'] =
                `projects/${project}/traces/${trace}`;
            }
        };

        const entry = Object.assign(
            {
              severity: 'NOTICE',
              message: 'This is the default display field.',
              component: 'arbitrary-property',
            },
            globalLogFields
          );

          console.log(JSON.stringify(entry));
        
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
        const subcategories = await vendorService.GetSubCategories(category as string);
        return res.status(200).json({
            result: subcategories,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {vendorRouter};
