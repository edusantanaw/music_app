import express, { Express } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors"
import * as env from "dotenv"

env.config()

export default (app: Express) => {
  const SESSION_SECRET = process.env.SESSION_SECRET!;
  const WEB_APP_URL = process.env.WEB_APP_URL

  app.use(cors({credentials: true, origin: WEB_APP_URL}))
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
