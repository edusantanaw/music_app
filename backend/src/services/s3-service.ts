import s3, {
  CreateBucketCommand,
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
}

export class S3Service {
  protected client: S3Client;

  constructor(protected log: Log) {
    this.client = new S3Client(this.getCredentials());
  }

  public async createBucket(bucket: string) {
    try {
      const createBucketCommand = new CreateBucketCommand({ Bucket: bucket,  });
      await this.client.send(createBucketCommand);
      this.log.info(`Create bucket ${bucket}`);
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: `arn:aws:s3:::${bucket}/*`,
          },
        ],
      };
  
      const putBucketPolicyCommand = new PutBucketPolicyCommand({
        Bucket: bucket,
        Policy: JSON.stringify(policy),
      })
      await this.client.send(putBucketPolicyCommand)
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
        ContentType: "text/plain",
      });
      const res = await this.client.send(command);
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
