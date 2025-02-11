import * as fs from "node:fs";
import * as env from "dotenv";
import { promisify } from "node:util";
import { Log } from "../main/config";
import { ICreateImage, ICreateImageData } from "./interfaces/create-image";
import { CreateImageError } from "./errors/create-image-error";

env.config();

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

export class CreateLocalImage implements ICreateImage {
  protected serverURL: string;

  constructor(protected log: Log) {
    this.serverURL = process.env.SERVER_URL!;
  }

  public async create(data: ICreateImageData): Promise<string> {
    try {
      const basePath = process.env.LOCAL_IMAGE_BASE_PATH;
      const date = new Date().getTime();
      const filename = `${data.filename}-${date}.${data.ext}`;
      const path = `${basePath}/${data.dir}`;
      await writeFileAsync(`${path}/${filename}`, data.data);
      this.log.info(`Image created with name ${filename}`);
      return `${this.serverURL}/${path}/${filename}`;
    } catch (error) {
      this.log.error(`Error on create local image ${error}`);
      throw new CreateImageError(`Error on create local image ${error}`);
    }
  }

  protected async prepareDir(path: string) {
    await mkdirAsync(path, { recursive: true });
  }
}
