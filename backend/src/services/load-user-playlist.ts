import { PlaylistRepository } from "../infra/repository/playlist-repository";

export class LoadUserPlaylist {
  constructor(protected repository: PlaylistRepository) {}

  public async load(requestedId: string, userId: string) {
    const playlists = await this.repository.loadByUser(
      requestedId,
      requestedId !== userId
    );
    return playlists;
  }
}
