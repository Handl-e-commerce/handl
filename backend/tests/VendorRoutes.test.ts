import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { vendorRouter } from "../routers/VendorRouter";
import { User } from "../db/models/User";
import { AuthToken } from "../db/models/AuthToken";
import * as argon2 from "argon2";
import { PlanType } from "../enums/PlanType";
const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");

const sendMailMock = jest.fn().mockReturnValue("Sent mock email!");
// Arrange
// Create a user to test with
const userDetails: any = {
    uuid: "test-uuid",
    email: "analyst@test.buzz",
    businessName: "Analyst & Associates",
    phoneNumber: "9876543210",
    password: "Bafang00l$!",
    firstName: "Test",
    lastName: "User2",
    address: "4398 Space st",
    city: "Crooklyn",
    state: "FY",
    zipcode: "42310",
    categories: ["Beauty", "Apparel"],
    isVerified: true,
    verificationToken: undefined,
    tokenExpiration: undefined,
    planType: "free",
    subscriptionExpiresAt: undefined,
};

jest.mock("nodemailer");

const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({"sendMail": sendMailMock});

beforeEach(async () => {
    await User.create(userDetails);
    await AuthToken.create({
        UserUuid: userDetails.uuid,
        selector: "test-selector",
        validator: await argon2.hash("test-validator"),
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    });
    sendMailMock.mockClear();
    nodemailer.createTransport.mockClear();
});

afterEach(async () => {
    await AuthToken.destroy({
        where: {
            UserUuid: userDetails.uuid,
        },
        force: true
    });
    await User.destroy({
        where: {
            uuid: userDetails.uuid,
        },
        force: true
    });
    jest.clearAllMocks();
});

describe("VendorRoutes tests", () => {
    // set up the express app and router
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use("/vendors", vendorRouter);
    
    it("Should return all vendor categories from the /vendors/categories endpoint", async () => {
        const response = await request(app).get("/vendors/categories");
        expect(response.status).toBe(200);
        expect(response.body.result.length).toEqual(48);
    });

    it("Should return only 5 rows for a user with a free plan", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=test-validator;';
        const planType = 'planType=Free;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;
        const userId = `userId=${userDetails.uuid}`
        
        const response = await request(app)
        .get("/vendors/categories/Electronics")
        .set(
            'Cookie',
            [selector + validator + planType + subscriptionExpiresAt + userId]
        );

        expect(response.body.result.length).toBe(5);
        expect(response.status).toBe(200);
    });

    it("Should return all rows for a given category for a premium user", async () => {
        await User.update(
            { 
                planType: PlanType[1], // Premium plan
                subscriptionExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days from now
            },
            {
                where: { uuid: userDetails.uuid }
            }
        );
        
        const selector = 'selector=test-selector;';
        const validator = 'validator=test-validator;';
        const planType = 'planType=Premium;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)};`;
        const userId = `userId=${userDetails.uuid}`
        
        const response = await request(app)
        .get("/vendors/categories/Electronics")
        .set(
            'Cookie',
            [selector + validator + planType + subscriptionExpiresAt + userId]
        );

        expect(response.body.result.length).toBeGreaterThan(5);
        expect(response.status).toBe(200);

        // Reset the user's plan back to free after the test
        await User.update(
            { 
                planType: PlanType[0],
                subscriptionExpiresAt: null
            },
            {
                where: { uuid: userDetails.uuid }
            }
        );
    });

    it("Should return only 5 results for an invalid validator", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=invalid-test-validator;';
        const planType = 'planType=Premium;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)};`;
        const userId = `userId=${userDetails.uuid}`
        
        const response = await request(app)
        .get("/vendors/categories/Electronics")
        .set(
            'Cookie',
            [selector + validator + planType + subscriptionExpiresAt + userId]
        );

        expect(response.body.result.length).toEqual(5);
        expect(response.status).toBe(200);
    });

    it("Should return only 5 results for empty cookies", async () => {
        const response = await request(app)
        .get("/vendors/categories/Electronics");
        
        expect(response.body.result.length).toEqual(5);
        expect(response.status).toBe(200);
    });

    it("Should return subcategories for a given category", async () => {
        const response = await request(app)
        .get("/vendors/subcategories?category=Electronics");

        expect(response.body.result.length).toBeGreaterThan(1);
    });
});