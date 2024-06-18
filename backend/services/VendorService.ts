import {IVendorService} from "../interfaces/IVendorService";
import {Vendor} from "../db/models/Vendor";
import {Op} from "sequelize";
import {VendorCategories} from "../db/models/VendorCategories";

/** Class Vendor Service */
class VendorService implements IVendorService {
    /**
     * Returns the total number of items found using the query and the results fixed by limit and offset
     * @param {string | undefined} categoryParam
     * @param {string | undefined} searchParams
     * @return {VendorCategories[]}
     */
    public async GetVendors(
        categoryParam: string | undefined,
        searchParams: string | undefined
    ): Promise<VendorCategories[]> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let whereClause: any = {};
            if (searchParams) {
                whereClause = {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${searchParams}%`,
                            },
                        },
                        {
                            description: {
                                [Op.iLike]: `%${searchParams}%`,
                            },
                        },
                    ],
                };
            }

            if (categoryParam) {
                whereClause.category = categoryParam;
            }

            const vendorResults: VendorCategories[] = await VendorCategories.findAll({
                where: {
                    category: categoryParam,
                },
                include: [{
                    model: Vendor,
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.iLike]: `%${searchParams}%`,
                                },
                            },
                            {
                                description: {
                                    [Op.iLike]: `%${searchParams}%`,
                                },
                            },
                        ],
                    },
                }],
            });

            return vendorResults;
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
}

export {VendorService};
