import {NextFunction, Request, Response} from "express";
const stripeSecretKey = process.env.NODE_ENV === "production" ?
    process.env.STRIPE_API_SECRET_KEY : process.env.STRIPE_SANDBOX_SECRET_KEY;

const stripe = require("stripe")(stripeSecretKey);

const express = require("express");

const billingRouter = express.Router();

billingRouter.use(express.json());

billingRouter.post("/subscribe", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hostname = req.body.hostname;
        if (!hostname) {
            return res.status(400).json({error: "Hostname is required"});
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
