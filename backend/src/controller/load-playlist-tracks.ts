import { LoadPlaylistTracks } from "../services/load-playlist-tracks";
import { HttpStatus, IHttpStatus } from "../utils/http-status";
import { IController } from "./controller";

export class LoadPlaylistTracksController implements IController {
  constructor(protected loadPlaylistTrack: LoadPlaylistTracks) {}

  public async handle(data: { id: string }): Promise<IHttpStatus> {
    console.log(data)
    const tracks = await this.loadPlaylistTrack.load(data.id);
    return HttpStatus.ok(tracks)
  }
}
