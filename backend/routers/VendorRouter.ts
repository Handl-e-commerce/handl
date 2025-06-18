const express = require("express");
import VendorController from "../controllers/VendorController";

const vendorRouter = express.Router();

vendorRouter.get("/categories/:category", VendorController.GetVendorsByCategory);

vendorRouter.get("/categories", VendorController.GetCategories);

vendorRouter.get("/subcategories", VendorController.GetSubcategories);

export {vendorRouter};
