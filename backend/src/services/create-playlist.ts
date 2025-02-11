import { PlaylistRepository } from "../infra/repository/playlist-repository";
import { ICreateImage } from "./interfaces/create-image";

export interface ICreatePlaylist {
  name: string;
  description: string;
  coverImageUrlBase64?: string;
  isPublic: false;
  userId: string;
  imageExt?: string;
}

interface ISaveImage {
  coverImageUrlBase64: string;
  imageExt: string;
  name: string;
}

export class CreatePlaylist {
  constructor(
    protected reposity: PlaylistRepository,
    protected createImage: ICreateImage
  ) {}

  public async create(data: ICreatePlaylist) {
    
    let coverImageUrl: string | undefined = undefined;

    if (data.coverImageUrlBase64 && data.imageExt) {
      coverImageUrl = await this.saveImage({
        coverImageUrlBase64: data.coverImageUrlBase64,
        imageExt: data.imageExt,
        name: data.name
      });
    }
    
    const playlist = await this.reposity.create({
      ...data,
      coverImageUrl,
      owner: data.userId,
    });
    return playlist;
  }

  protected async saveImage(data: ISaveImage) {
    const coverImageUrl = await this.createImage.create({
      data: data.coverImageUrlBase64,
      filename: data.name.split(" ").join("_"),
      ext: data.imageExt,
      type: "base64",
      dir: "playlist/coverage",
    });

    return coverImageUrl;
  }
}
