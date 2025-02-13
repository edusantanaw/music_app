import { CreateLocalImage } from "./create-local-image";
import {
  ICreateImage,
  ICreateImageData,
  ICreateImageResponse,
} from "./interfaces/create-image";
import { S3Service } from "./s3-service";
import * as fs from "node:fs";

export class CreateObjectStorageObject implements ICreateImage {
  constructor(
    protected s3Service: S3Service,
    protected createLocalImage: CreateLocalImage,
    protected bucket: string
  ) {}

  public async create(data: ICreateImageData): Promise<ICreateImageResponse> {
    const shouldDelete: string[] = [];
    try {
      const localImage = await this.createLocalImage.create(data);
      shouldDelete.push(localImage.fileDirPath);
      await this.s3Service.createBucket(this.bucket);
      const s3Url = await this.s3Service.uploadFile({
        bucket: this.bucket,
        filePath: localImage.fileDirPath,
        keyName: localImage.filename,
      });

      return {
        fileDirPath: localImage.fileDirPath,
        filename: data.filename,
        url: s3Url,
      };
    } catch (error) {
      throw error;
    } finally {
      shouldDelete.forEach((e) => {
      });
    }
  }
}
