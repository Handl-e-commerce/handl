import {NextFunction, Request, Response} from "express";
import {PlanType} from "../enums/PlanType";
import {User} from "../db/models/User";
import { Transaction } from "../db/models/Transaction";
import Stripe from "stripe";
const dotenv = require("dotenv");
dotenv.config({path: ".env"});
if (process.env.NODE_ENV === "local_dev") {
    dotenv.config({path: ".env.local"});
}
const stripeSecretKey = process.env.STRIPE_API_SECRET_KEY;

if (!stripeSecretKey) {
    throw new Error("Stripe API secret key is not defined in environment variables.");
}

const stripe = require("stripe")(stripeSecretKey);

const express = require("express");

const webhookRouter = express.Router();

webhookRouter.post(
    "/stripe",
    express.raw({type: "application/json"}),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const signature = req.headers["stripe-signature"];
            const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
            const event = stripe.webhooks.constructEvent(req.body, signature as string, webhookSecret as string);
            if (event.type === "checkout.session.completed") {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.client_reference_id;
                const planType = session.metadata?.planType ?? PlanType[1];
                await User.update({
                    planType: planType,
                    subscriptionExpiresAt: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
                },
                {
                    where: {uuid: userId as string},
                });
                await Transaction.create({
                    userId: userId as string,
                    stripeSessionId: session.id,
                    stripeCustomerId: session.customer as string | null,
                    planType: planType,
                    amount: 899.99,
                    currency: "USD",
                    status: session.status,
                    paymentIntentId: session.payment_intent as string | null,
                    subscriptionStartDate: new Date(Date.now()),
                    subscriptionEndDate: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
                    metadata: session.metadata,
                });
            } else {
                console.warn(`Unhandled event type: ${event.type}`);
            }
        } catch (err: unknown) {
            return next(err as Error);
        }
    }
);

export {webhookRouter};
