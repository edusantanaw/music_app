import s3, {
  CreateBucketCommand,
  GetBucketAclCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import * as env from "dotenv";
import * as fs from "node:fs";
import { Log } from "../main/config";

env.config();

interface UploadFile {
  bucket: string;
  filePath: string;
  keyName: string;
  contentType: string;
}

export class S3Service {
  protected client: S3Client;

  constructor(protected log: Log) {
    this.client = new S3Client(this.getCredentials());
  }

  public async getBucket(bucket: string) {
    try {
      const command = new GetBucketAclCommand({
        Bucket: bucket,
      });
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      this.log.error(`Error on get bucket: ${bucket} error: ${error}`);
      throw error;
    }
  }

  public async createBucket(bucket: string) {
    try {
      const createBucketCommand = new CreateBucketCommand({ Bucket: bucket });
      await this.client.send(createBucketCommand);
      this.log.info(`Create bucket ${bucket}`);
      await this.configBucketPolices(bucket);
      return false;
    } catch (error) {
      this.log.error(`Error on create bucket ${error}`);
      return false;
    }
  }

  public async uploadFile(data: UploadFile) {
    try {
      const fileStream = fs.createReadStream(data.filePath);
      const command = new PutObjectCommand({
        Bucket: data.bucket,
        Key: data.keyName,
        Body: fileStream,
        ContentType: data.contentType,
      });
      await this.client.send(command);
      const url = new URL(
        `${data.bucket}/${data.keyName}`,
        process.env.S3_ENDPOINT
      );
      return url.href;
    } catch (error) {
      this.log.error(`Error on upload file ${error}`);
      throw error;
    }
  }

  protected async configBucketPolices(bucket: string) {
    const policy = {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: "*",
          Action: "s3:GetObject",
          Resource: `arn:aws:s3:::${bucket}/*`,
        },
      ],
    };

    const putBucketPolicyCommand = new PutBucketPolicyCommand({
      Bucket: bucket,
      Policy: JSON.stringify(policy),
    });
    await this.client.send(putBucketPolicyCommand);
  }

  protected getCredentials(): S3ClientConfig {
    return {
      endpoint: process.env.S3_ENDPOINT!,
      region: process.env.S3_REGION!,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
      },
      forcePathStyle: true,
    };
  }
}
