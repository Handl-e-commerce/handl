import {IVendorService} from "../interfaces/IVendorService";
import {Vendor} from "../db/models/Vendor";
import {Op, Sequelize} from "sequelize";
import {Category} from "../db/models/Category";

/** Vendor Service Class */
class VendorService implements IVendorService {
    /**
     * Returns the total number of items found using the query and the results fixed by limit and offset
     * @param {string | null | undefined} categories
     * @param {string[] | null | undefined} subcategories
     * @param {string[] | null | undefined} searchVal
     * @param {string[] | null | undefined} states
     * @return {Promise<Vendor[]>}
     */
    public async GetVendors(
        categories: string | null | undefined,
        subcategories: string[] | null | undefined,
        searchVal: string | null | undefined,
        states: string[] | null | undefined,
    ): Promise<Vendor[]> {
        try {
            let whereClause = {};
            // TODO: (LOW) Remove references for searchVal as we are no longer implementing the search bar
            if (searchVal) {
                whereClause = {
                    ...whereClause,
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
                whereClause = {
                    ...whereClause,
                    categories: {
                        [Op.iLike]: `%${categories}%`,
                    },
                };
            }
            if (subcategories) {
                whereClause = {
                    ...whereClause,
                    subcategories: {
                        [Op.in]: subcategories,
                    },
                };
            }

            const vendorResults: Vendor[] = await Vendor.findAll({
                where: whereClause,
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
     * @return {Promise<string[]>}
     */
    public async GetCategories(): Promise<string[]> {
        try {
            return (await Category.findAll({
                order: [
                    ["category", "ASC"],
                ],
                attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"]],
            })).map((row) => row.category) as string[];
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    /**
     * Simple method to return all of the subcategories associated with a given category
     * @param {string} category
     * @return {Promise<string[]>}
     */
    public async GetSubCategories(category: string): Promise<string[]> {
        try {
            const results = (await Category.findAll({
                where: {
                    category: category,
                },
                attributes: ["subcategory"],
            })).map((row) => row.subcategory);

            return results[0] !== null ? results as string[] : [];
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
}

export {VendorService};
