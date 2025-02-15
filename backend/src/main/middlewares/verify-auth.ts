import { NextFunction, Request, Response } from "express";
import { User } from "../../infra/entities";


export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  return next();
};
