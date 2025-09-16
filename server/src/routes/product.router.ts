import express from "express";
import { getAllProducts } from "src/controllers/product.controller.js";
import { isAdmin, protectRoute } from "src/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, isAdmin, getAllProducts);
router.get("/featured");
router.post("/", protectRoute, isAdmin);

export default router;
