import { unlink } from "node:fs";
import * as path from "node:path";
import { promisify } from "node:util";
import {
  ICreateImage,
  ICreateImageData,
  ICreateImageResponse,
} from "./interfaces/create-image";
import { S3Service } from "./s3-service";

const unlinkAsync = promisify(unlink)

export class CreateObjectStorageObject implements ICreateImage {
  constructor(protected s3Service: S3Service, protected bucket: string) {}

  public async create(data: ICreateImageData): Promise<ICreateImageResponse> {
    const shouldDelete: string[] = [];
    try {
      shouldDelete.push(data.path);
      await this.ensureBucketExits()
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
      for await (const file of shouldDelete) {
        await unlinkAsync(file)
      }
    }
  }

  protected async ensureBucketExits() {
    const bucket = await this.s3Service.getBucket(this.bucket)
    if(!bucket){
      await this.s3Service.createBucket(this.bucket);
    }
  }
}
