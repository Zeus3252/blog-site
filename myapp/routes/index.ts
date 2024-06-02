import { userRouteHandler } from "../controllers/indexController";
import { signUpHandler, loginHandler } from "../controllers/authController";
import express from "express";

const router = express.Router();

router.get("/users/", userRouteHandler);

router.post("/signup", signUpHandler);

router.post("/login", loginHandler);

router.get("/home", (req, res) => {
  res.send("Welcome to the home page!");
});

export default router;
