import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
import * as env from "dotenv"

env.config()

export default () => {
  const WEB_APP_URL = process.env.WEB_APP_URL;

  const router = Router();
  
  router.get("/", (_, res) => {
    res.status(200).json("Autenticado");
  });
  
  router.get(
    "/api/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/api/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (_, res) => res.redirect(`${WEB_APP_URL}/`)
  );

  router.get("/api/logout", (req, res) => {
    req.logout(() => res.redirect(`${WEB_APP_URL}/login`));
  });

  return router;
};
