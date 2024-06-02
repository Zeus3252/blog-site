import prisma from "../prisma";
import express from "express";
import session from "express-session";
import type { User } from "@prisma/client";
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

export const signUpHandler = [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  async (req: any, res: any, next: any): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send("Invalid input");
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
      res.status(500).send("Error signing up");
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
          return done(null, false, { message: "Incorrect username." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
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

export const loginHandler = [
  body("username").trim().isLength({ min: 1 }).escape(),
  body("password").trim().isLength({ min: 1 }).escape(),
  async (req: any, res: any, next: any): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send("Invalid input");
      }

      const { username, password } = req.body;

      const user = await prisma.user.findUnique({ where: { username } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.error("Invalid credentials for user:", username);
        return res.status(401).send("Invalid credentials");
      }

      req.logIn(user, (err: any) => {
        if (err) {
          console.error("Session login error:", err);
          return res.status(500).send("Internal Server Error");
        }
        req.session.save(() => {
          console.log("User authenticated and session created:", req.session);
          return res.redirect("/home");
        });
      });
    } catch (e) {
      console.error("Authentication error:", e);
      return res.status(500).send("Internal Server Error");
    }
  },
];
