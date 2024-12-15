import {Category} from "../db/models/Category";
import {Vendor} from "../db/models/Vendor";

interface IVendorService {
    // TODO: (LOW) Remove references for searchVal as we are no longer implementing the search bar
    GetVendors: (
        categories: string | null | undefined,
        subcategories: string[] | null | undefined,
        searchVal: string | null | undefined,
        states: string[] | null | undefined,
    ) => Promise<Vendor[]>;
    GetCategories: () => Promise<Category[]>;
    GetSubCategories: (category: string) => Promise<Category[]>;
}

export {IVendorService};
