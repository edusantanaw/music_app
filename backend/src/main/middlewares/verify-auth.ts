import { NextFunction, Request, Response } from "express";
import { User } from "../../infra/entities";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.redirect("/api/google");
    return;
  }
  const user = req.user as User;
  req.body["userId"] = user.id;
  req.body["userEmail"] = user.email;
  return next();
};
