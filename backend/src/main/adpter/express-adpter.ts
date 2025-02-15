import { Request, Response } from "express";
import { IController } from "../../controller/controller";
import { Log } from "../config";
import { ErrorHandler } from "../config/error-hanlder";
import { User } from "../../infra/entities";

export default (controller: IController) => {
  const log = new Log("controller-request");
  return async (req: Request, res: Response) => {
    try {
      const user = req.user as User;
      const { statusCode, body } = await controller.handle({
        ...req.query,
        ...req.params,
        ...req.body,
        userId: user.id,
        userEmail: user.email,
        file: req.file,
      });

      res.status(statusCode).json(body);
    } catch (error) {
      log.error(`${req.method} - ${req.path} - ${error}`);
      const { statusCode, body } = ErrorHandler.handler(error);
      res.status(statusCode).json(body);
    }
  };
};
