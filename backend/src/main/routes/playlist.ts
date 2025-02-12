import { Router } from "express";
import expressAdpter from "../adpter/express-adpter";
import { createPlaylistControllerFactory } from "../factories/controller/create-playlist";
import verifyAuth from "../middlewares/verify-auth";
import { loadPlaylistTrackControllerFactory } from "../factories/controller/load-playlist-track";

export default () => {
  const router = Router();

  router.use(verifyAuth);

  router.post(
    "/api/playlist",
    expressAdpter(createPlaylistControllerFactory())
  );
  router.get(
    "/api/playlist/tracks/{id}",
    expressAdpter(loadPlaylistTrackControllerFactory())
  );

  return router;
};
