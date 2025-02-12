import { LoadPlaylistTracksController } from "../../../controller/load-playlist-tracks";
import { loadPlaylistServiceFactory } from "../services/load-playlist-service";

export function loadPlaylistTrackControllerFactory() {
  return new LoadPlaylistTracksController(loadPlaylistServiceFactory());
}
