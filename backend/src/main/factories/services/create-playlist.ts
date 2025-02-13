import { PlaylistRepository } from "../../../infra/repository/playlist-repository";
import { CreatePlaylist } from "../../../services/create-playlist";
import { createObjectStorageFactory } from "./create-object-storage";

export function createPlaylistFactory() {
  const playlistRepository = new PlaylistRepository();
  const createImage = createObjectStorageFactory("playlist2")
  return new CreatePlaylist(playlistRepository, createImage);
}
