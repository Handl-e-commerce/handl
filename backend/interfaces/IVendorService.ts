import {VendorCategories} from "../db/models/VendorCategories";

interface IVendorService {
    GetVendors: (
        categories: string[] | null | undefined,
        searchVal: string | null | undefined,
    ) => Promise<VendorCategories[]>;
}

export {IVendorService};
