import prisma from "../prisma";
import express from "express";
import session from "express-session";
import type { User } from "@prisma/client";
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

app.use(passport.initialize());
app.use(passport.session());

export const signUpHandler = [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  async (req: any, res: any, next: any): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Error signing up");
      }
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: Omit<User, "id"> = {
        username,
        password: hashedPassword,
      };

      await prisma.user.create({ data: newUser });
      res.redirect("/home");
    } catch (e) {
      console.error(e);
    }
  },
];

export const setupPassport = () => {
  passport.use(
    new LocalStrategy(async (username: any, password: any, done: any) => {
      try {
        const user = await prisma.user.findUnique({
          where: { username },
        });
        if (!user) {
          return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, 2);
  });

  passport.deserializeUser(async (id: any, done: any) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

export const loginHandler = (app: any) => {
  app.post("/login", (req: any, res: any, next: any) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        console.error("Authentication error:");
        return;
      }
      if (!user) {
        console.log("Invalid credentials");
        return;
      }
      req.logIn(user, (err: any) => {
        if (err) {
          console.error("Session login error");
          return;
        }
        return res.redirect("/home");
      });
    })(req, res, next);
  });
};
