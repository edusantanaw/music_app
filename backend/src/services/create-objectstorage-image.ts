import { unlinkSync } from "node:fs";
import * as path from "node:path";
import {
  ICreateImage,
  ICreateImageData,
  ICreateImageResponse,
} from "./interfaces/create-image";
import { S3Service } from "./s3-service";

export class CreateObjectStorageObject implements ICreateImage {
  constructor(protected s3Service: S3Service, protected bucket: string) {}

  public async create(data: ICreateImageData): Promise<ICreateImageResponse> {
    const shouldDelete: string[] = [];
    try {
      const bucket = await this.s3Service.getBucket(this.bucket)
      if(!bucket){
        await this.s3Service.createBucket(this.bucket);
      }
      shouldDelete.push(data.path);
      const filename = path.basename(data.path);
      const s3Url = await this.s3Service.uploadFile({
        bucket: this.bucket,
        filePath: data.path,
        keyName: filename,
        contentType: data.contentType
      });

      return {
        filename: filename,
        url: s3Url,
      };
    } catch (error) {
      throw error;
    } finally {
      shouldDelete.forEach((e) => {
        unlinkSync(e)
      });
    }
  }
}
