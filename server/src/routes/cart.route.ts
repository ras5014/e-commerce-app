import express from "express";
import * as cartController from "src/controllers/cart.controller.js";
import { protectRoute } from "src/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, cartController.getCartItems);
router.post("/", protectRoute, cartController.addToCart);
router.delete("/", protectRoute, cartController.removeFromCart);
router.put("/:productId", protectRoute, cartController.updateQuantity);

export default router;
