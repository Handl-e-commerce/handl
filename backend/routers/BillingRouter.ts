import {NextFunction, Request, Response} from "express";
import {PlanType} from "../enums/PlanType";
import {VerificationService} from "../services/VerificationService";
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

const billingRouter = express.Router();

billingRouter.use(express.json());

billingRouter.post("/subscribe", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;
        const userId = cookies.userId;
        if (!cookies || userId === undefined) {
            return res.status(400).json({error: "User ID is required"});
        }
        const hostname = req.body.hostname;
        if (!hostname) {
            return res.status(400).json({error: "Hostname is required"});
        }

        const verificationService = new VerificationService();
        const verificationResult = await verificationService.VerifyUser(cookies.selector, cookies.validator, userId);

        if (!verificationResult.result) {
            return res.status(400).json({error: "User verification failed"});
        }

        if (verificationResult.planType == PlanType[1]) {
            return res.status(400).json({error: "User is already subscribed"});
        }

        const priceId = process.env.NODE_ENV === "production" ?
            "price_1RgdI403qEXOPJPaGa0Ij5Qq" : "price_1Rf1iS03jjb671QdjNefc4UB";
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${hostname}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${hostname}/subscribe/cancel?session_id={CHECKOUT_SESSION_ID}`,
            automatic_tax: {enabled: true},
            client_reference_id: userId,
            metadata: {
                userId: userId,
                planType: PlanType[1],
            },
        });
        return res.status(201).json({
            url: session.url,
            sessionId: session.id,
        });
    } catch (err: unknown) {
        return next(err as Error);
    }
});

export {billingRouter};
