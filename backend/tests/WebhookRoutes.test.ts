import { describe, it, expect, beforeEach, afterEach, jest } from "@jest/globals";
const express = require("express");
const request = require("supertest");
const cookieParser = require("cookie-parser");
import { webhookRouter } from "../routers/WebhookRouter";
import { PlanType } from "../enums/PlanType";
import Stripe from "stripe";
import { Transaction } from "../db/models/Transaction";
import { User } from "../db/models/User";

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

// Create a mock stripe event to handle the transaction
const mockEvent = {
    type: "checkout.session.completed",
    data: {
        object: {
            id: "cs_test_123",
            object: "checkout.session",
            client_reference_id: userDetails.uuid,
            customer: "cus_test_123",
            status: "succeeded",
            metadata: {
                planType: PlanType[1]
            },
            amount_total: 899.99,
            currency: "usd",
            payment_method_types: ["card"],
            payment_intent: "pi_test_123",
            subscription: "sub_test_123",
            subscription_details: {
                subscription: "sub_test_123",
                plan: "plan_test_123"
            }
        }
    }
};


beforeEach(async () => {
    jest.spyOn(Stripe.webhooks, "constructEvent").mockImplementation(() => mockEvent as any);
    await User.create(userDetails);
});

afterEach(async () => {
    jest.clearAllMocks();
    await Transaction.destroy({
        where: {
            userId: userDetails.uuid
        },
        force: true
    });
    await User.destroy({
        where: {
            uuid: userDetails.uuid
        },
        force: true
    });
});

describe("WebhookRoutes tests", () => {
    // set up the express app and router
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use("/webhook", webhookRouter);

    it("should return 200 for valid webhook request", async () => {

        const response = await request(app)
            .post("/webhook/stripe")
            .send(mockEvent)
            .set("Content-Type", "application/json");
        
        expect(response.status).toBe(201);

        const user = await User.findOne({
            where: {
                uuid: userDetails.uuid
            }
        });
        expect(user?.planType).toBe(PlanType[1]);
        expect(user?.subscriptionExpiresAt).toBeDefined();
        const transaction = await Transaction.findOne({
            where: {
                userId: userDetails.uuid
            }
        });
        expect(transaction).toBeDefined();
        expect(transaction?.stripeSessionId).toBe(mockEvent.data.object.id);
    });
});
