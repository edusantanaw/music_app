import { CreatePlaylist } from "../services/create-playlist";
import { HttpStatus, IHttpStatus } from "../utils/http-status";
import { IController } from "./controller";

export interface ICreatePlaylist {
  name: string;
  description: string;
  file?: Express.Multer.File;
  isPublic: boolean;
  userId: string;
}

export class CreatePlaylistController implements IController {
  constructor(protected createPlaylist: CreatePlaylist) {}

  public async handle(data: ICreatePlaylist): Promise<IHttpStatus> {
    // [TODO] implement schema validation
    const playlist = await this.createPlaylist.create({
      ...data,
      coverImage: data.file,
    });
    return HttpStatus.created(playlist);
  }
}
