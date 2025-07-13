import {Request, Response, NextFunction} from "express";
import {VendorService} from "../services/VendorService";
import {VerificationService} from "../services/VerificationService";
import {Vendor} from "../db/models/Vendor";
import {PlanType} from "../enums/PlanType";

/**
 * Vendor Controller Class
 * Handles requests related to vendors.
 * @class VendorController
 */
class VendorController {
    /**
     * Handles the request to get vendors by category.
     * This method retrieves vendors based on the provided category, subcategories, and states.
     * It also checks the user's verification status to determine if they are a premium user.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof VendorController
     * @async
     */
    async GetVendorsByCategory(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const cookies = req.cookies;
            const verificationService = new VerificationService();
            const verificationStatus = await verificationService.VerifyUser(
                cookies.selector,
                cookies.validator,
                cookies.userId
            );
            const category = req.query.category ? (req.query.category as string).trim() : req.params.category;

            const subcategories = req.query.subcategories ?
                (req.query.subcategories as string).split(",").map((s) => s.trim()) :
                null;
            const states = req.query.states ?
                (req.query.states as string).split(",").map((s) => s.trim()) :
                null;

            const vendorService = new VendorService();
            const isPremium = verificationStatus.result && verificationStatus.planType === PlanType[1] &&
                // There might be a timezone issue here but will deal with this in the future
                new Date(verificationStatus.subscriptionExpirationDate as Date) > new Date();

            const limit = isPremium ? undefined : 5;
            const vendors: Vendor[] = await vendorService.GetVendors(category, subcategories, states, limit);

            return res.status(200)
                .cookie("planType", verificationStatus.planType, {
                    expires: new Date(Date.now() + (1000*60*60*24*90)),
                    sameSite: "none",
                    secure: true,
                    httpOnly: false,
                })
                .json({result: vendors});
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Handles the request to get all categories.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof VendorController
     * @async
     */
    async GetCategories(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const vendorService: VendorService = new VendorService();
            const categories = await vendorService.GetCategories();
            return res.status(200).json({
                result: categories,
            });
        } catch (err: unknown) {
            return next(err as Error);
        }
    }

    /**
     * Handles the request to get subcategories based on a category.
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {Promise<Response | void>}
     * @throws {Error} If an error occurs during the process.
     * @memberof VendorController
     * @async
     */
    async GetSubcategories(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
    }
}

export default new VendorController();
