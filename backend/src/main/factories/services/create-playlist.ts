import { PlaylistRepository } from "../../../infra/repository/playlist-repository";
import { CreateLocalImage } from "../../../services/create-local-image";
import { CreatePlaylist } from "../../../services/create-playlist";
import { Log } from "../../config";

export function createPlaylistFactory() {
  const playlistRepository = new PlaylistRepository();
  const localImageLog = new Log("create-local-image");
  const createLocalImage = new CreateLocalImage(localImageLog);
  return new CreatePlaylist(playlistRepository, createLocalImage);
}
