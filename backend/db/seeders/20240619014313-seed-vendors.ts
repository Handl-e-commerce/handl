import path from "path";
import {DataTypes, QueryInterface} from "sequelize";
import {v4 as uuidv4} from "uuid";
const fs = require("node:fs/promises");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /* eslint-disable */
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        const data: {
            uuid?: string;
            name: string;
            description: string;
            website: string;
            keywords: string;
            categories: string[];
            subcategories: string[];
            people: string;
            address: string;
            city: string;
            state: string;
            zipcode: string;
            phoneNumber: string;
            email: string;
        }[] = JSON.parse(await fs.readFile(path.resolve(__dirname, "./seed-data/AsdVendorDataWithWholesaleCentralCategories.json"), 'utf8'));
        data.forEach((item: any) => {
            item.uuid = uuidv4().toString();
            item.createdAt = new Date(Date.now());
            item.updatedAt = new Date(Date.now());
            item.categories = ([...new Set(item.categories)]).sort().toString();
            item.subcategories = ([...new Set(item.subcategories)]).sort().toString();
            item.people = (item.people as string).split(",");
        });
        
    /* eslint-enable */
        return await queryInterface.bulkInsert("Vendors", data, {});
    },

    // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        return await queryInterface.bulkDelete("Vendors", {}, {});
    },
};
