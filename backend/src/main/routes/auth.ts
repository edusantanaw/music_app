import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";

export default () => {
  const router = Router();
  router.get("/", (req, res) => {
    res.status(200).json("Autenticado");
  });
  router.get(
    "/api/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  router.get(
    "/api/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (_, res) => res.redirect("/")
  );

  router.get("/api/logout", (req, res) => {
    req.logout(() => res.redirect("/login"));
  });
  return router;
};
