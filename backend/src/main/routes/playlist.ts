import { Router } from "express";
import expressAdpter from "../adpter/express-adpter";
import { createPlaylistControllerFactory } from "../factories/controller/create-playlist";
import { loadPlaylistTrackControllerFactory } from "../factories/controller/load-playlist-track";
import { loadUserPlaylistControllerFactory } from "../factories/controller/load-user-playlist";
import verifyAuth from "../middlewares/verify-auth";

export default () => {
  const router = Router();

  router.use(verifyAuth);
  router.use((req, res, next)=> {
    console.log(req.url)
    next()
  })
  router.post(
    "/api/playlist",
    expressAdpter(createPlaylistControllerFactory())
  );

  router.get(
    "/api/playlist/tracks/:id",
    expressAdpter(loadPlaylistTrackControllerFactory())
  );

  router.get(
    "/api/playlist/user/:id",
    expressAdpter(loadUserPlaylistControllerFactory())
  );

  return router;
};
