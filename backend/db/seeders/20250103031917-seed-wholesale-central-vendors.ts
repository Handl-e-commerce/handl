import path from "path";
import {DataTypes, QueryInterface} from "sequelize";
const fs = require("node:fs/promises");
import {v4 as uuidv4} from "uuid";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    // eslint-disable-next-line
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        const data: {
        uuid?: string;
        name: string;
        description: string;
        website: string;
        keywords: string;
        categories: string[];
        subcategories: string[];
        people: string[];
        address: string;
        city: string;
        state: string;
        zipcode: string;
        phoneNumber: string;
        email: string;
    }[] = JSON.parse(await fs.readFile(path.resolve(__dirname, "./seed-data/WholesaleCentralVendors.json"), "utf8"));

        const dataToInsert: {
      uuid?: string;
      name: string;
      description: string;
      website: string;
      keywords: string;
      categories: string[];
      subcategories: string[];
      people: string[];
      address: string;
      city: string;
      state: string;
      zipcode: string;
      phoneNumber: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    }[] = [];

        for (let i = 0; i < data.length; i++) {
            let email = data[i].email;
            if (data[i].email === "-") {
                email = "";
            }
            dataToInsert.push({
                uuid: uuidv4().toString(),
                name: data[i].name,
                description: data[i].description,
                website: data[i].website,
                keywords: data[i].keywords,
                categories: data[i].categories,
                subcategories: data[i].subcategories,
                people: data[i].people,
                address: data[i].address,
                city: data[i].city,
                state: data[i].state,
                zipcode: data[i].zipcode,
                phoneNumber: data[i].phoneNumber,
                email: email,
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            });
        }

        /* eslint-enable */
        return await queryInterface.bulkInsert("Vendors", dataToInsert, {});
    },
    // eslint-disable-next-line
  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        return await queryInterface.bulkDelete("Vendors", {}, {});
    },
};
