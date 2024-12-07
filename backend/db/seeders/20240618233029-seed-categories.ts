import path from "path";
import {DataTypes, QueryInterface} from "sequelize";
const fs = require("node:fs/promises");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    let data: { [category: string]: { subcategories: string[] } } = JSON.parse(await fs.readFile(path.resolve(__dirname, "./seed-data/updated-categories.json"), 'utf8'));
    let formatedData: {
        id: number;
        category: string;
        subcategory: string;
        createdAt: Date;
        updatedAt: Date;
    }[] = [];
    Object.keys(data).forEach((category: string) => {
        data[category].subcategories.forEach((subcategory: string, index: number) => {
            formatedData.push({
                id: index + 1,
                category: category,
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
