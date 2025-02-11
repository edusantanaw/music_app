import { randomUUID } from "crypto";
import { Repository } from "typeorm";
import { AppDataSource } from "../../main/config";
import { Playlist } from "../entities";

interface ICreatePlaylist {
  name: string;
  description?: string;
  coverImageUrl?: string;
  isPublic: false;
  owner: string;
}

export class PlaylistRepository {
  protected repository: Repository<Playlist>;
  constructor() {
    this.repository = AppDataSource.getRepository(Playlist);
  }

  public async create(data: ICreatePlaylist) {
    const playlist = this.repository.create({
      name: data.name,
      description: data?.description,
      coverImageUrl: data?.coverImageUrl,
      isCreatedOnSpotify: false,
      isPublic: data.isPublic,
      owner: {
        id: data.owner,
      },
      id: randomUUID(),
    });
    const createdPlaylist = await this.repository.save(playlist);
    return createdPlaylist;
  }
}
