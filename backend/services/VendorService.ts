import {IVendorService} from "../interfaces/IVendorService";
import {Vendor} from "../db/models/Vendor";
import {Op} from "sequelize";
import {VendorCategories} from "../db/models/VendorCategories";
import {Category} from "../db/models/Category";

/** Vendor Service Class */
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

            return vendorResults;
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    /**
     * Simple method to return all of the categories in the database
     * @return {Category[]}
     */
    public async GetCategories(): Promise<Category[]> {
        try {
            return await Category.findAll({
                attributes: ["subcategory"],
            });
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
}

export {VendorService};
