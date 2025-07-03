import {NextFunction, Request, Response} from "express";
const stripeSecretKey = process.env.NODE_ENV === "production" ?
    process.env.STRIPE_API_SECRET_KEY : process.env.STRIPE_SANDBOX_SECRET_KEY;

const stripe = require("stripe")(stripeSecretKey);

const express = require("express");

const billingRouter = express.Router();

billingRouter.post("/subscribe", async (req: Request, res: Response, next: NextFunction) => {
    try {
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
            success_url: `${req.protocol}://${req.get("host")}/subscribe/success`,
            cancel_url: `${req.protocol}://${req.get("host")}/subscribe/cancel`,
            automatic_tax: {enabled: true},
        });
        console.log(session.url);
        res.status(201).json({
            url: session.url,
            sessionId: session.id,
        });
        // res.redirect(303, session.url);
    } catch (err: unknown) {
        next(err as Error);
    }
});

export {billingRouter};
