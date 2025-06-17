import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { userRouter } from "../routers/UserRouter";
import { User } from "../db/models/User";
import { AuthToken } from "../db/models/AuthToken";
import * as argon2 from 'argon2';
const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");

const sendMailMock = jest.fn().mockReturnValue("Sent mock email!");
// Arrange
// Create a user to test with
const userDetails = {
    uuid: "0df06746-dbf0-41d1-9272-ee2ddd51eb04",
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
    verificationToken: null,
    tokenExpiration: null,
    planType: "free",
    subscriptionExpiresAt: null,
    savedVendors: ['6906356c-df26-46ba-8f61-dabe7b57c988','a21c4cd9-73d2-4c90-a2e7-dda857becb32']
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

describe("UserRoutes tests", () => {
    // set up the express app and router
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use("/users", userRouter);
    
    it("Get the users information", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=test-validator;';
        const planType = 'planType=Free;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;
        const userId = `userId=${userDetails.uuid}`
        const response = await request(app)
            .get("/users/me")
            .set("Cookie", [selector + validator + planType + subscriptionExpiresAt + userId]);
        
        expect(response.status).toBe(200);
        expect(response.body.user.uuid).toBe(userDetails.uuid)
    });

    it("Should throw a 401 error because cookies are not valid for users/me", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=invalid-test-validator;';
        const planType = 'planType=Free;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;
        const userId = `userId=${userDetails.uuid}`
        try {
            const response = await request(app)
                .get("/users/me")
                .set("Cookie", [selector + validator + planType + subscriptionExpiresAt + userId]);
            expect(response.status).toBe(401);
        } catch(error) {}
    });

    it("Should return saved vendors because user is authenticated", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=test-validator;';
        const planType = 'planType=Free;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;
        const userId = `userId=${userDetails.uuid}`
        const response = await request(app)
            .get("/users/me/vendors")
            .set("Cookie", [selector + validator + planType + subscriptionExpiresAt + userId]);
        
        expect(response.status).toBe(200);
        expect(response.body.savedVendors.length).toBe(2);
    });

    it("Should return 401 for saved vendors because user is unauthenticated", async () => {
        const selector = 'selector=test-selector;';
        const validator = 'validator=invalid-test-validator;';
        const planType = 'planType=Free;';
        const subscriptionExpiresAt = `subsctriptionExpiresAt=undefined;`;
        const userId = `userId=${userDetails.uuid}`
        try {
            const response = await request(app)
                .get("/users/me/vendors")
                .set("Cookie", [selector + validator + planType + subscriptionExpiresAt + userId]);
            expect(response.status).toBe(401);
        } catch (error) {}
    });

    it("Should update the user password", async () => {
        const response = await request(app)
            .put(`/users/${userDetails.uuid}/password`)
            .send({newPassword: 'TestPassword'});

        expect(response.body.message.message).toContain(`Successfully updated password of user ${userDetails.uuid}`);
    });

});