import {describe, expect, it} from "@jest/globals";
import {VendorService} from "../services/VendorService";

describe("VendorService tests", () => {
    it("Should return all results", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(0);
    });

    it("Should return only rows that match the passed category", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors("Apparel / Clothing", undefined, undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(118);
    });

    it("Should return only rows that match the passed category and subcategories", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors("Apparel / Clothing", ["Women's Apparel", "Men's Apparel"], undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(9);
    });

    it("Should return only rows that match the search param", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, "365 Fashions Inc.", undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1);
    });

    it("Should return only rows that match both search params and passed categories", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors("Sunglasses & Eyewear", undefined, "365 Fashions Inc.", undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1);
    });

    it("Should return only rows that match the passed in states", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, undefined, ["NY", "TX"]);
        expect(results).toBeDefined();
        expect(results.length).toEqual(160);
    });
    
    it("Should be case insensitive when querying states", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, undefined, ["ny", "tx"]);
        expect(results).toBeDefined();
        expect(results.length).toEqual(160);
    });

    it("Should return only rows that match the search param and states", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, "365 Fashions Inc.", ["NY"]);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1);
    });
    
    it("Should return only rows that match the categories, search param, and states", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors("Sunglasses & Eyewear", undefined, "365 Fashions Inc.", ["NY"]);
        expect(results).toBeDefined();
        expect(results.length).toEqual(1);
    });

    it("Should return values that are specific to keywords", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined, "fba", undefined);
        expect(results).toBeDefined();
        expect(results.length).toEqual(4);
    });
});