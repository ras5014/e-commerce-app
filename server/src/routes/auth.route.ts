import express from "express";
import * as authController from "src/controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.registerUserController);

export default router;
