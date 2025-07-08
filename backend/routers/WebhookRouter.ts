import {NextFunction, Request, Response} from "express";
const dotenv = require("dotenv");
dotenv.config({path: ".env"});
if (process.env.NODE_ENV === "local_dev") {
    dotenv.config({path: ".env.local"});
}
const stripeSecretKey = process.env.NODE_ENV === "production" ?
    process.env.STRIPE_API_SECRET_KEY : process.env.STRIPE_SANDBOX_SECRET_KEY;

const stripe = require("stripe")(stripeSecretKey);

const express = require("express");

const webhookRouter = express.Router();

webhookRouter.post(
    "/stripe",
    express.raw({type: "application/json"}),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Node Env: ", process.env.NODE_ENV);
            const signature = req.headers["stripe-signature"];
            const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
            console.log("Webhook secret:", webhookSecret);
            const event = stripe.webhooks.constructEvent(req.body, signature as string, webhookSecret as string);
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;
                // Handle successful checkout session
                console.log("Checkout session completed:", session);
            } else {
                console.warn(`Unhandled event type: ${event.type}`);
            }
        } catch (err: unknown) {
            return next(err as Error);
        }
    }
);

export {webhookRouter};
