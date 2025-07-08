require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import {Express, Request, Response, NextFunction} from "express";
import {Database} from "./db/Database";
import {userRouter} from "./routers/UserRouter";
import {vendorRouter} from "./routers/VendorRouter";
import {billingRouter} from "./routers/BillingRouter";
import {webhookRouter} from "./routers/WebhookRouter";

const PORT = process.env.PORT;

const app: Express = express();

const whitelist = [
    "http://localhost:3000",
    "https://thehandl.com",
    "https://dev.thehandl.com",
    "https://dev.client.thehandl.com",
    "self",
];
const corsOptions = {
    // eslint-disable-next-line
    origin: function(origin: string, callback: any) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(cookieParser());

// routers
app.use("/users", userRouter);
app.use("/vendors", vendorRouter);
app.use("/billing", billingRouter);
app.use("/webhook", webhookRouter);

app.get( "/", async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const msg: string = await Database.TestConnection();
        return res.json({message: msg});
    } catch (err: unknown) {
        return next(err as Error);
    }
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});

export {app};
