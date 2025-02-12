import { LoadPlaylistTracks } from "./../../../services/load-playlist-tracks";
import { PlaylistRepository } from "../../../infra/repository/playlist-repository";
import { spotifyServiceFactory } from "./spotify-service";

export function loadPlaylistServiceFactory() {
  const playlistRepository = new PlaylistRepository();
  return new LoadPlaylistTracks(playlistRepository, spotifyServiceFactory());
}
