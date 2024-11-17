import {QueryInterface, DataTypes, Op} from "sequelize";
import { Vendor } from "../models/Vendor";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    let names = await Vendor.findAll({
      attributes: [
        "name"
      ]
    });
    let keywords = await Vendor.findAll({
      where: {
        keywords: {
          [Op.ne]: ""
        }
      },
      attributes: [
        "keywords"
      ]
    });
    const regex = /[^\x00-\x7F]+/;
    let data = new Set<string>([]);
    keywords.forEach((row) => {
      let words = row.dataValues.keywords.split(',');
      words.forEach((word) => {
        if (word !== '' && !regex.test(word))
          data.add(word.trim());
      });
    });

    names.forEach((name) => data.add(name.dataValues.name.trim()));

    let transformedData: {
      keyword: string;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];
    data.forEach((datum) => {
      transformedData.push({ 
        keyword: datum,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      })
    });
    
    return await queryInterface.bulkInsert("Keywords", transformedData, {});
  },
  // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.bulkDelete("Keywords", {}, {});
  }
};
