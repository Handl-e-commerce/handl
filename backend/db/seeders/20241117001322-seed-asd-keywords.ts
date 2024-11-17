import {QueryInterface, DataTypes, Op} from "sequelize";
import {Vendor} from "../models/Vendor";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        const names = await Vendor.findAll({
            attributes: [
                "name",
            ],
        });
        const keywords = await Vendor.findAll({
            where: {
                keywords: {
                    [Op.ne]: "",
                },
            },
            attributes: [
                "keywords",
            ],
        });
        // eslint-disable-next-line no-control-regex
        const regex = /[^\x00-\x7F]+/;
        const data = new Set<string>([]);
        keywords.forEach((row) => {
            const words = row.dataValues.keywords.split(",");
            words.forEach((word) => {
                if (word !== "" && !regex.test(word)) {
                    data.add(word.trim());
                }
            });
        });

        names.forEach((name) => data.add(name.dataValues.name.trim()));

        const transformedData: {
      keyword: string;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];
        data.forEach((datum) => {
            transformedData.push({
                keyword: datum,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            });
        });

        return await queryInterface.bulkInsert("Keywords", transformedData, {});
    },
    // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        return await queryInterface.bulkDelete("Keywords", {}, {});
    },
};
