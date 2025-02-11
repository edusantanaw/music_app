import { CreatePlaylistController } from "../../../controller/create-playlist-controller";
import { createPlaylistFactory } from "../services/create-playlist";

export function createPlaylistControllerFactory() {
  return new CreatePlaylistController(createPlaylistFactory());
}
