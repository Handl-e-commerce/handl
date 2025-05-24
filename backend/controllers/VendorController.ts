import { VendorService } from "../services/VendorService";
import {NextFunction, Request, Response} from "express";

export async function GetVendors(req: Request, res: Response, next: NextFunction){

}

export async function GetCategories(req: Request, res: Response, next: NextFunction) {
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

export async function GetSubcategories(req: Request, res: Response, next: NextFunction) {
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