import {Vendor} from "../db/models/Vendor";

interface IVendorService {
    // TODO: (LOW) Remove references for searchVal as we are no longer implementing the search bar
    GetVendors: (
        categories: string | null | undefined,
        subcategories: string[] | null | undefined,
        searchVal: string | null | undefined,
        states: string[] | null | undefined,
    ) => Promise<Vendor[]>;
    GetCategories: () => Promise<string[]>;
    GetSubCategories: (category: string) => Promise<string[]>;
}

export {IVendorService};
