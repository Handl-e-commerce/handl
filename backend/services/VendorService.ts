import {IVendorService} from "../interfaces/IVendorService";
import {Vendor} from "../db/models/Vendor";
import {Op} from "sequelize";

/** Class Vendor Service */
class VendorService implements IVendorService {

    /**
    * Returns the total number of items found using the query and the results fixed by limit and offset
    * @param {string} limit
    * @param {string} offset
    * @param {string | undefined} categoryParam
    * @param {string | undefined} searchParams
    * @returns {count: number, vendors: Vendor[]}
    */
    public async GetVendors(
        limit: number,
        offset: number,
        categoryParam: string | undefined,
        searchParams: string | undefined
    ): Promise<{count: number, vendors: Vendor[]}> {
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
            };
      
            const count: number = await this.GetCountOfListings(whereClause);
      
            // safety check in case someone wants to be cheeky and put a limit > 80 in the query params
            if (limit > 50) {
              limit = 50;
            };
      
            const vendorResults: Vendor[] = await Vendor.findAll({
              where: whereClause,
              order: [
                ["row", "DESC"],
              ],
              offset: (offset - 1) * limit,
              limit: limit,
            });
      
            const result = {
              count: count,
              vendors: vendorResults,
            };
      
            return result;
          } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
          }
    };
   
   /**
   * Returns the number of results found from query, meant specifically for GetListings method
   * @typedef {Object} whereClause
   * @property {string | undefined} category
   * @property {string | undefined} searchParams
   * @param {whereClause} whereClause
   * @return {Promise<number>}
   */
  private async GetCountOfListings(whereClause: any): Promise<number> {
    try {
      const count: number = await Vendor.count({
        where: whereClause,
      });
      return count;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
};

export {VendorService}