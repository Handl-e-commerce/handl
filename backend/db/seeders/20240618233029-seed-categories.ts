import path from "path";
import {DataTypes, QueryInterface} from "sequelize";
import {Category} from "../models/Category";
const fs = require("node:fs/promises");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.bulkDelete("Categories", {}, {});
        const data: { [category: string]: { subcategories: string[] } } = JSON.parse(
            await fs.readFile(path.resolve(__dirname, "./seed-data/updated-categories.json"), "utf8")
        );
        const formatedData: {
        category: string;
        subcategory: string;
    }[] = [];
        Object.keys(data).forEach((category: string) => {
            if (data[category].subcategories.length > 0) {
                data[category].subcategories.forEach((subcategory: string) => {
                    formatedData.push({
                        category: category,
                        subcategory: subcategory,
                    });
                });
            }
            else {
                formatedData.push({
                    category: category,
                    subcategory: "",
                });
            }
        });
        for (let i = 0; i < formatedData.length; i++) {
            await Category.create({
                category: formatedData[i].category,
                subcategory: formatedData[i].subcategory,
            });
        }
        return;
    },
    // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        return await queryInterface.bulkDelete("Categories", {}, {});
    },
};
