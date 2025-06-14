import {describe, expect, it} from "@jest/globals";
import {VendorService} from "../services/VendorService";

describe("VendorService tests", () => {
    it.skip("Should return all results", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(0);
    });

    it.skip("Should return only rows that match the passed category", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors("Apparel / Clothing", undefined, undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(242);
    });

    it.skip("Should return only rows that match the passed category and subcategories", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors("Apparel / Clothing", ["Women's Apparel", "Men's Apparel"], undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(9);
    });


    it.skip("Should return only rows that match the passed in states", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, ["NY", "TX"], undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(237);
    });
    
    it.skip("Should be case insensitive when querying states", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, ["ny", "tx"], undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(237);
    });
});