import * as fs from "node:fs";
import * as env from "dotenv";
import { promisify } from "node:util";
import { Log } from "../main/config";
import { ICreateImage, ICreateImageData, ICreateImageResponse } from "./interfaces/create-image";
import { CreateImageError } from "./errors/create-image-error";

env.config();

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

export class CreateLocalImage implements ICreateImage {
  protected serverURL: string;

  constructor(protected log: Log) {
    this.serverURL = process.env.SERVER_URL!;
  }

  public async create(
    data: ICreateImageData
  ): Promise<ICreateImageResponse> {
    try {
      console.log(data)
      const basePath = process.env.LOCAL_IMAGE_BASE_PATH;
      const date = new Date().getTime();
      const filename = `${data.filename}-${date}.${data.ext}`;
      const path = `${basePath}/${data.dir}`;
      await this.prepareDir(path);
      await writeFileAsync(`${path}/${filename}`, Buffer.from(data.data), "base64");
      this.log.info(`Image created with name ${filename}`);
      return {
        url: `${this.serverURL}/${data.dir}/${filename}`,
        fileDirPath: `${basePath}/${data.dir}/${filename}`,
        filename
      };
    } catch (error) {
      this.log.error(`Error on create local image ${error}`);
      throw new CreateImageError(`Error on create local image ${error}`);
    }
  }

  protected async prepareDir(path: string) {
    await mkdirAsync(path, { recursive: true });
  }
}
