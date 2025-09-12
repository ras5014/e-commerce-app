import express from "express";
import * as authController from "src/controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.registerUserController);
router.post("/login", authController.loginUserController);
router.post("/logout", authController.logoutUserController);
router.post("/refresh-token", authController.refreshAccessTokenController);

export default router;
