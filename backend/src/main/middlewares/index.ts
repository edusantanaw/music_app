import express, { Express } from "express";
import session from "express-session";
import passport from "passport";

export default (app: Express) => {
  const SESSION_SECRET = process.env.SESSION_SECRET!;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
