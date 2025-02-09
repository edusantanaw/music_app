import { Express } from "express";
import auth from "./auth";

export default (app: Express) => {
    app.use(auth())
};
