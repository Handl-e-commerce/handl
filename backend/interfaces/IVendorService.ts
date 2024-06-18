import { VendorCategories } from "../db/models/VendorCategories";

interface IVendorService {
    GetVendors: (
        categoryParam: string | undefined,
        searchParams: string | undefined,
        userId: string | undefined,
    ) => Promise<VendorCategories[]>;
}

export {IVendorService};
