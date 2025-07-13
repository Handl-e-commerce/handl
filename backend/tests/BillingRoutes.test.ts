const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");
import { jest, it, expect, describe, beforeEach, afterEach } from "@jest/globals";
import { User } from "../db/models/User";
import { PlanType } from "../enums/PlanType";
import { billingRouter } from "../routers/BillingRouter";
import { AuthToken } from "../db/models/AuthToken";
import * as argon2 from "argon2";

// Arrange
// Create a user to test with
const userDetails = {
    uuid: "0df06746-dbf0-41d1-9272-ee2ddd51eb04",
    email: "t_soprano@satriellies.com",
    businessName: "Mob Inc.",
    phoneNumber: "9876543210",
    password: "Bafang00l$!",
    firstName: "Tony",
    lastName: "Gunta",
    address: "4398 Space st",
    city: "Crooklyn",
    state: "FY",
    zipcode: "42310",
    categories: ["Beauty", "Apparel"],
    isVerified: true,
    verificationToken: null,
    tokenExpiration: null,
    planType: "free",
    subscriptionExpiresAt: null,
    savedVendors: ['6906356c-df26-46ba-8f61-dabe7b57c988','a21c4cd9-73d2-4c90-a2e7-dda857becb32']
};

beforeEach(async () => {
    await User.create(userDetails);
    await AuthToken.create({
        UserUuid: userDetails.uuid,
        selector: "test-selector",
        validator: await argon2.hash("test-validator"),
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
    });
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

describe("BillingRoutes tests", () => {
    // set up the express app and router
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use("/billing", billingRouter);
    
    it("should return 400 if user ID is not provided", async () => {
        try {
            const selector = 'selector=test-selector;';
            const validator = 'validator=test-validator;';
            const planType = 'planType=Free;';
            const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;

            const res = await request(app)
            .post("/billing/subscribe")
            .set("Cookie", [selector + validator + planType + subscriptionExpiresAt])
            .send({ hostname: "https://thahandl.com" });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/User ID is required/);
        } catch (error) {
            console.error(error);
        }
    });

    it("should return 400 if hostname is not provided", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=test-validator;';
        const planType = 'planType=Free;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;

        const res = await request(app)
            .post("/billing/subscribe")
            .set("Cookie", [`userId=${userDetails.uuid};` + selector + validator + planType + subscriptionExpiresAt])
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/Hostname is required/);
    });

    it("should return 400 if user verification fails", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=invalid-test-validator;';
        const planType = 'planType=Free;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;

        const res = await request(app)
            .post("/billing/subscribe")
            .set("Cookie", ["userId=bad-user" + selector + validator + planType + subscriptionExpiresAt])
            .send({ hostname: "https://thahandl.com" });
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/User verification failed/);
    });

    it("should return 400 if plan type is already premium", async () => {
        await User.update({
            planType: PlanType[1],
            subscriptionExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        }, {
            where: {
                email: userDetails.email
            }
        });
        const selector = 'selector=test-selector;';
        const validator = 'validator=test-validator;';
        const planType = 'planType=Premium;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString()};`;
        const res = await request(app)
            .post("/billing/subscribe")
            .set("Cookie", [`userId=${userDetails.uuid};` + selector + validator + planType + subscriptionExpiresAt])
            .send({ hostname: "https://thahandl.com" });
        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/already subscribed/);
    });
});
