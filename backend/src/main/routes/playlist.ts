import { Router } from "express";
import expressAdpter from "../adpter/express-adpter";
import { createPlaylistControllerFactory } from "../factories/controller/create-playlist";
import verifyAuth from "../middlewares/verify-auth";

export default () => {
  const router = Router();

  router.post(
    "/api/playlist",
    verifyAuth,
    expressAdpter(createPlaylistControllerFactory())
  );

  return router
};
