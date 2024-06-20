import { QueryInterface, DataTypes } from "sequelize"
import { Vendor } from "../models/Vendor";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    let vendors: Vendor[] = await Vendor.findAll({});

    for (let i = 0; i < vendors.length; i++) {
      let vendor = vendors[i];
      if (vendor?.categories) {
        let categorgies = vendor.categories.split(",");
        for (let i = 0; i < categorgies.length; i++) {
          await queryInterface.bulkInsert("VendorCategories", [{
            vendor: vendor?.name,
            category: categorgies[i].trim(),
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
          }], {});
        }
      }
    };
  },
  // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    return await queryInterface.bulkDelete("VendorCategories", {}, {});
  }
};
