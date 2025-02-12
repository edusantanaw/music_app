import { CreatePlaylist, ICreatePlaylist } from "../services/create-playlist";
import { HttpStatus, IHttpStatus } from "../utils/http-status";
import { IController } from "./controller";

export class CreatePlaylistController implements IController {
  constructor(protected createPlaylist: CreatePlaylist) {}

  public async handle(data: ICreatePlaylist): Promise<IHttpStatus> {
    // [TODO] implement schema validation
    const playlist = await this.createPlaylist.create(data);
    return HttpStatus.created(playlist)
  }
}
