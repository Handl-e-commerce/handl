import {IVendorService} from "../interfaces/IVendorService";
import {Vendor} from "../db/models/Vendor";
import {Op} from "sequelize";
import {VendorCategories} from "../db/models/VendorCategories";

/** Class Vendor Service */
class VendorService implements IVendorService {
    /**
     * Returns the total number of items found using the query and the results fixed by limit and offset
     * @param {string[] | null | undefined} categories
     * @param {string[] | null | undefined} searchVal
     * @return {Vendor[]}
     */
    public async GetVendors(
        categories: string[] | null | undefined,
        searchVal: string | null | undefined
    ): Promise<Vendor[]> {
        try {
            const vendorResults: Vendor[] = await Vendor.findAll({
                where: searchVal ? {
                    name: {
                        [Op.iLike]: `%${searchVal}%`,
                    },
                }: {},
                include: [{
                    model: VendorCategories,
                    where: categories ? {
                        CategorySubcategory: {
                            [Op.or]: categories,
                        },
                    } : {},
                }],
            });

            // const vendorResults: VendorCategories[] = await VendorCategories.findAll({
            //     where: categories ? {
            //         CategorySubcategory: {
            //             [Op.or]: categories
            //         }
            //     }: {},
            //     include: [{
            //         model: Vendor,
            //         where: searchVal ? {
            //             name: {
            //                 [Op.iLike]: `%${searchVal}%`
            //             }
            //         } : {}
            //     }],
            // });

            return vendorResults;
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
}

export {VendorService};
