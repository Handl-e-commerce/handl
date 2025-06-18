import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    // Update categories in the Categories table to replace ' / ' with ' & '
        await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS temp_categories;
      CREATE TEMPORARY TABLE temp_categories AS 
      SELECT * FROM public."Categories";

      UPDATE temp_categories
      SET category = REPLACE(category, ' / ', ' & ')
      WHERE category LIKE '% / %';

      UPDATE public."Categories"
      SET category = temp_categories.category
      FROM temp_categories
      WHERE public."Categories".id = temp_categories.id;
      
      DROP TABLE IF EXISTS temp_categories;
    `);
        // Update categories in the Vendors table to replace '/' with '&'
        await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS temp_vendors;
      CREATE TEMPORARY TABLE temp_vendors AS
      SELECT * FROM public."Vendors";

      UPDATE temp_vendors
      SET categories = REPLACE(categories, '/', '&')
      WHERE categories IS NOT NULL;

      UPDATE public."Vendors"
      SET categories = temp_vendors.categories
      FROM temp_vendors
      WHERE public."Vendors".uuid = temp_vendors.uuid;  
    `);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS temp_categories;
      CREATE TEMPORARY TABLE temp_categories AS 
      SELECT * FROM public."Categories";

      UPDATE temp_categories
      SET category = REPLACE(category, ' & ', ' / ')
      WHERE category LIKE '% & %';

      UPDATE public."Categories"
      SET category = temp_categories.category
      FROM temp_categories
      WHERE public."Categories".id = temp_categories.id;
      
      DROP TABLE IF EXISTS temp_categories;
    `);

        await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS temp_vendors;
      CREATE TEMPORARY TABLE temp_vendors AS
      SELECT * FROM public."Vendors";

      UPDATE temp_vendors
      SET categories = REPLACE(categories, '&', '/')
      WHERE categories IS NOT NULL;

      UPDATE public."Vendors"
      SET categories = temp_vendors.categories
      FROM temp_vendors
      WHERE public."Vendors".uuid = temp_vendors.uuid;  
    `);
    },

};
