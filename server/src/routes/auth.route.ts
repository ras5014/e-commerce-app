import express from "express";
import * as authController from "src/controllers/auth.controller.js";
import { protectRoute } from "src/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.registerUserController);
router.post("/login", authController.loginUserController);
router.post("/logout", authController.logoutUserController);
router.post("/refresh-token", authController.refreshAccessTokenController);
router.get("/profile", protectRoute, authController.getProfile);

export default router;
