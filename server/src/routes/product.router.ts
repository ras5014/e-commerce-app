import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProducts,
} from "src/controllers/product.controller.js";
import { isAdmin, protectRoute } from "src/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, isAdmin, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);

router.post("/", protectRoute, isAdmin, createProduct);
router.patch("/:id", protectRoute, isAdmin, toggleFeaturedProducts);
router.delete("/:id", protectRoute, isAdmin, deleteProduct);

export default router;
