import { PlaylistRepository } from "../../../infra/repository/playlist-repository";
import { LoadUserPlaylist } from "../../../services/load-user-playlist";

export function loadUserPlaylistFactory(){
    const playlistRepository = new PlaylistRepository()
    return new LoadUserPlaylist(playlistRepository)
}