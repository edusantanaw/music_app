import { PlaylistRepository } from "../infra/repository/playlist-repository";
import { NotFoundError } from "./errors/not-found";
import { SpotifyService } from "./spotify-service";

export class LoadPlaylistTracks {
  constructor(
    protected repository: PlaylistRepository,
    protected spotifyService: SpotifyService
  ) {}

  public async load(playlistId: string) {
    const playlist = await this.repository.loadById(playlistId);
    if (!playlist) throw new NotFoundError("Playlist not found!");
    const tracks = await this.spotifyService.loadTracksByPlaylist(playlist);
    return tracks;
  }
}
