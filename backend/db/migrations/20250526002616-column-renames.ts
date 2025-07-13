import {DataTypes, QueryInterface} from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        // User table camelCase to snake_case renames
        await queryInterface.renameColumn("Users", "firstName", "first_name");
        await queryInterface.renameColumn("Users", "lastName", "last_name");
        await queryInterface.renameColumn("Users", "businessName", "business_name");
        await queryInterface.renameColumn("Users", "phoneNumber", "phone_number");
        await queryInterface.renameColumn("Users", "savedVendors", "saved_vendors");
        await queryInterface.renameColumn("Users", "isVerified", "is_verified");
        await queryInterface.renameColumn("Users", "verificationToken", "verification_token");
        await queryInterface.renameColumn("Users", "tokenExpiration", "token_expiration");

        // Vendor table camelCase to snake_case renames
        await queryInterface.renameColumn("Vendors", "phoneNumber", "phone_number");
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async down(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
        // User table snake_case to camelCase renames
        await queryInterface.renameColumn("Users", "first_name", "firstName");
        await queryInterface.renameColumn("Users", "last_name", "lastName");
        await queryInterface.renameColumn("Users", "business_name", "businessName");
        await queryInterface.renameColumn("Users", "phone_number", "phoneNumber");
        await queryInterface.renameColumn("Users", "saved_vendors", "savedVendors");
        await queryInterface.renameColumn("Users", "is_verified", "isVerified");
        await queryInterface.renameColumn("Users", "verification_token", "verificationToken");
        await queryInterface.renameColumn("Users", "token_expiration", "tokenExpiration");

        // Vendor table snake_case to camelCase renames
        await queryInterface.renameColumn("Vendors", "phone_number", "phoneNumber");
    },
};
