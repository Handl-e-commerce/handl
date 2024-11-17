import {IVendorService} from "../interfaces/IVendorService";
import {Vendor} from "../db/models/Vendor";
import {Op} from "sequelize";
import {VendorCategories} from "../db/models/VendorCategories";
import {Category} from "../db/models/Category";
import {Keyword} from "../db/models/Keyword";

/** Vendor Service Class */
class VendorService implements IVendorService {
    /**
     * Returns the total number of items found using the query and the results fixed by limit and offset
     * @param {string[] | null | undefined} categories
     * @param {string[] | null | undefined} searchVal
     * @param {string[] | null | undefined} states
     * @return {Vendor[]}
     */
    public async GetVendors(
        categories: string[] | null | undefined,
        searchVal: string | null | undefined,
        states: string[] | null | undefined,
    ): Promise<Vendor[]> {
        try {
            let whereClause = {};
            const includeClause = [];
            if (searchVal) {
                whereClause = {
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${searchVal}%`,
                            },
                        },
                        {
                            description: {
                                [Op.iLike]: `%${searchVal}%`,
                            },
                        },
                        {
                            keywords: {
                                [Op.iLike]: `%${searchVal}%`,
                            },
                        },
                    ],
                };
            }
            if (states) {
                const properStates: string[] = states.map((state) => state.toUpperCase());
                whereClause = {
                    ...whereClause,
                    state: {
                        [Op.or]: properStates,
                    },
                };
            }
            if (categories) {
                includeClause.push({
                    model: VendorCategories,
                    where: {
                        CategorySubcategory: {
                            [Op.or]: categories,
                        },
                    },
                });
            }

            const vendorResults: Vendor[] = await Vendor.findAll({
                where: whereClause,
                include: includeClause,
                attributes: [
                    "uuid",
                    "name",
                    "description",
                    "website",
                    "categories",
                    "people",
                    "address",
                    "city",
                    "state",
                    "zipcode",
                    "phoneNumber",
                    "email",
                ],
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
                order: [
                    ["subcategory", "ASC"],
                ],
                attributes: ["subcategory"],
            });
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    /**
     * Returns a list of 10 max best predictions for predictive search
     * @param {string} searchVal
     * @return {string[]}
     */
    public async GetPredictions(searchVal: string): Promise<string[]> {
        try {
            const results: string[] = (await Keyword.findAll({
                where: {
                    keyword: {
                        [Op.iLike]: `${searchVal.toLocaleLowerCase()}%`,
                    },
                },
                limit: 10,
                attributes: [
                    "keyword",
                ],
                order: [
                    ["keyword", "ASC"],
                ],
            })).map((row) => row.dataValues.keyword);

            return results;
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
}

export {VendorService};
