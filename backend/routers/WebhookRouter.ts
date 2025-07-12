import {NextFunction, Request, Response} from "express";
import {PlanType} from "../enums/PlanType";
import {User} from "../db/models/User";
import {Transaction} from "../db/models/Transaction";
import Stripe from "stripe";
const dotenv = require("dotenv");
dotenv.config({path: ".env"});
if (process.env.NODE_ENV === "local_dev") {
    dotenv.config({path: ".env.local", override: true});
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
        // Verify webhook request
        const signature = req.headers["stripe-signature"];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(req.body, signature as string, webhookSecret as string);
        } catch (err: unknown) {
            return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
        }

        try {
            switch (event.type) {
            case "checkout.session.completed": {
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
                    amount: session.amount_total as number,
                    currency: session.currency as string,
                    status: session.status,
                    paymentIntentId: session.payment_intent as string | null,
                    subscriptionStartDate: new Date(Date.now()),
                    subscriptionEndDate: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
                    metadata: session.metadata,
                });
                break;
            }
            case "charge.succeeded":
                console.log("Charge Succeeded", event.data.object);
                break;
            case "payment_intent.created":
                console.log("Payment Intent Created", event.data.object);
                break;
            case "payment_intent.succeeded":
                console.log("Payment Intent Succeeded", event.data.object);
                break;
            case "charge.updated":
                console.log("Charge Updated", event.data.object);
                break;
            case "payment_intent.requires_action":
                console.log("Payment Intent Requires Action", event.data.object);
                break;
            case "payment_intent.payment_failed":
                console.log("Payment Intent Payment Failed", event.data.object);
                break;
            default:
                console.warn(`Unhandled event type: ${event.type}`);
                break;
            }
            return res.status(201).json({message: "Event processed successfully"});
        } catch (err: unknown) {
            return next(err as Error);
        }
    }
);

export {webhookRouter};
