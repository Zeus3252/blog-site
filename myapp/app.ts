import type { Request, Response, NextFunction } from "express";
import type { ErrnoException } from "./types/definitions";
import { setupPassport } from "./controllers/authController";
import session from "express-session";
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const cors = require("cors");
const compression = require("compression");
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

setupPassport();

app.use("/", router);

app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function (
  err: ErrnoException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status ?? 500);
  res.json(err);
});

export default app;
