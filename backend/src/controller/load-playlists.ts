import { HttpStatus, IHttpStatus } from "../utils/http-status";
import { LoadUserPlaylist } from "./../services/load-user-playlist";
import { IController } from "./controller";

export class LoadUserPlaylistsController implements IController {
  constructor(protected LoadUserPlaylist: LoadUserPlaylist) {}

  public async handle(data: {
    id: string;
    userId: string;
  }): Promise<IHttpStatus> {
    const tracks = await this.LoadUserPlaylist.load(data.id, data.userId);
    return HttpStatus.ok(tracks);
  }
}
