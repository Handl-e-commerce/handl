import {Vendor} from "../db/models/Vendor";

interface IVendorService {
    GetVendors: (
        categories: string[] | null | undefined,
        searchVal: string | null | undefined,
        states: string[] | null | undefined,
    ) => Promise<Vendor[]>;
}

export {IVendorService};
