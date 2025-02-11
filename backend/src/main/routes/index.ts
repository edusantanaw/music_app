import { Express } from "express";
import auth from "./auth";
import playlist from "./playlist";

export default (app: Express) => {
    app.use(auth())
    app.use(playlist())
};
