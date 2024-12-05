import path from "path";
import {DataTypes, QueryInterface} from "sequelize";
const fs = require("node:fs/promises");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    let data: { [parentCategory: string]: { subcategories: string[] } } = JSON.parse(await fs.readFile(path.resolve(__dirname, "./seed-data/updated-categories.json"), 'utf8'));
    let formatedData: {
        parentCategory: string;
        subcategory: string;
        createdAt: Date;
        updatedAt: Date;
    }[] = [];
    Object.keys(data).forEach((key: string) => {
        data[key].subcategories.forEach((subcategory: string) => {
            formatedData.push({
                parentCategory: key,
                subcategory: subcategory,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        });
    });
    return await queryInterface.bulkInsert("Categories", formatedData, {});
    },
    // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        return await queryInterface.bulkDelete("Categories", {}, {});
    },
};
