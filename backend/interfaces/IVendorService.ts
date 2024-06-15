import { Vendor } from "../db/models/Vendor";

interface IVendorService {
    GetVendors: (
        limit: number,
        offset: number,
        categoryParam: string | undefined,
        searchParams: string | undefined,
        userId: string | undefined,
    ) => Promise<{count: number, vendors: Vendor[]}>;
}

export {IVendorService};
