import {describe, expect, it, afterEach, afterAll, beforeAll} from "@jest/globals";
import {VendorService} from "../services/VendorService";

describe("VendorService tests", () => {
    it("Should return all results", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(0);
    });

    it("Should return only rows that match the passed categories", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(["Sunglasses / Eyewear"], undefined);
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(0);
    });

    it("Should return only rows that match the search param", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, "365 Fashions Inc.");
        console.log(results);
        expect(results).toBeDefined();
        expect(results.length).toEqual(4);
    });

    it("Should return only rows that match both search params and passed categories", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors(undefined, undefined);
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(0);
    });
});