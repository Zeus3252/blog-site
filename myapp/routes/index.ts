import { userRouteHandler } from "../controllers/indexController";
import { authController } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.get("/users/", userRouteHandler);

router.post("/signup", authController);

export default router;
