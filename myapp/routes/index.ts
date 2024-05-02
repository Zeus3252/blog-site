import { userRouteHandler } from "../controllers/indexController";
import { signUpHandler, loginHandler } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.get("/users/", userRouteHandler);

router.post("/signup", signUpHandler);

router.post("/login", loginHandler);
export default router;
