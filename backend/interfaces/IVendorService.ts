interface IVendorService {
    GetVendors(): () => Promise<void>;
}

export {IVendorService};
