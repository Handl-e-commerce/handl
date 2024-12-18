import {describe, expect, it} from "@jest/globals";
import {VendorService} from "../services/VendorService";
import { Vendor } from "../db/models/Vendor";
import { Op } from "sequelize";

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

    it("Should return the vendors queried for based on ids", async () => {
        const vendors: {
            uuid: string;
            name: string;
        }[] = [
            {
                uuid: 'id1',
                name: 'mock name 1',
            },
            {
                uuid: 'id2',
                name: 'mock name 2',
            },
            {
                uuid: 'id3',
                name: 'mock name 3',
            },
            {
                uuid: 'id4',
                name: 'mock name 4',
            },
        ];
        const vendorIds = vendors.map(x => x.uuid);
        await Vendor.bulkCreate(vendors);
        let vendorService = new VendorService();
        let results = (await vendorService.GetVendorsByVendorIds(vendorIds.slice(0,2))).map((vendor) => vendor.uuid);
        expect(results).toEqual(vendorIds.slice(0,2));
        expect(results.length).toEqual(vendorIds.slice(0,2).length);
        await Vendor.destroy({
            where: {
                uuid: {
                    [Op.or]: vendorIds,
                },
            },
        });
    });
});