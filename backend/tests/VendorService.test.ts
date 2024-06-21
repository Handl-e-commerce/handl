import {describe, expect, it, afterEach, afterAll, beforeAll} from "@jest/globals";
import {VendorService} from "../services/VendorService";

describe("VendorService tests", () => {
    it("Should return all results", async () => {
        let vendorService = new VendorService();
        let results = await vendorService.GetVendors();
        expect(results).toBeDefined();
        expect(results.length).toBeGreaterThan(0);
    });
});