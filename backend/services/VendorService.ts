import {IVendorService} from "../interfaces/IVendorService";
// import {Vendor} from "../db/models/Vendor";
import {Op} from "sequelize";
import {VendorCategories} from "../db/models/VendorCategories";

/** Class Vendor Service */
class VendorService implements IVendorService {
    /**
     * Returns the total number of items found using the query and the results fixed by limit and offset
     * @param {string[] | null | undefined} categories
     * @param {string[] | null | undefined} searchVal
     * @return {VendorCategories[]}
     */
    public async GetVendors(
        categories: string[] | null | undefined,
        searchVal: string | null | undefined
    ): Promise<VendorCategories[]> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const whereClause: any = {};

            if (categories) {
                whereClause.category = {[Op.or]: categories};
            }
            if (searchVal) {
                whereClause.vendor = {[Op.iLike]: `%${searchVal}%`};
            }

            const vendorResults: VendorCategories[] = await VendorCategories.findAll({
                where: whereClause,
                // include: [{
                //     model: Vendor,
                // }],
            });

            return vendorResults;
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
}

export {VendorService};
