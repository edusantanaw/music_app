import { PlaylistRepository } from "../infra/repository/playlist-repository";
import { ICreateImage } from "./interfaces/create-image";

export interface ICreatePlaylist {
  name: string;
  description: string;
  coverImage?: Express.Multer.File;
  isPublic: boolean;
  userId: string;
}

interface ISaveImage {
  coverImage: Express.Multer.File;
}

export class CreatePlaylist {
  constructor(
    protected reposity: PlaylistRepository,
    protected createImage: ICreateImage
  ) {}

  public async create(data: ICreatePlaylist) {
    
    let coverImage: string | undefined = undefined;

    if (data.coverImage) {
      coverImage = await this.saveImage({
        coverImage: data.coverImage,
      });
    }
    
    const playlist = await this.reposity.create({
      ...data,
      coverImageUrl: coverImage,
      owner: data.userId,
    });
    return playlist;
  }

  protected async saveImage(data: ISaveImage) {
    const path = data.coverImage.path
    const coverImage = await this.createImage.create({
      path,
    });

    return coverImage.url;
  }
}
