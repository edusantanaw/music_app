import { LoadUserPlaylistsController } from "../../../controller/load-playlists";
import { loadUserPlaylistFactory } from "../services/load-user-playlist";

export function loadUserPlaylistControllerFactory() {
  return new LoadUserPlaylistsController(loadUserPlaylistFactory());
}
