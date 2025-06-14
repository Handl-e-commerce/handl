import { describe, it, expect } from "@jest/globals";
import { userRouter } from "../routers/UserRouter";
const express = require("express");
const request = require("supertest");

describe("VendorRoutes tests", () => {
    // set up the express app and router
    const app = express();
    app.use(express.json());
    app.use("/users", userRouter);
    
    it("Should return all vendor categories from the /users/ endpoint", async () => {
        const response = await request(app).get("/vendors/categories");
        expect(response.status).toBe(200);
        expect(response.body.result.length).toEqual(52);
    });
});