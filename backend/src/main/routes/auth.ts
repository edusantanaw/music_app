import * as env from "dotenv";
import { Router } from "express";
import passport from "passport";
import verifyAuth from "../middlewares/verify-auth";

env.config();

export default () => {
  const WEB_APP_URL = process.env.WEB_APP_URL;

  const router = Router();

  router.get("/api/verify-auth", verifyAuth, (_, res) => {
    res.status(200).send({ message: "OKaaaaaaaaaaaaa" });
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
