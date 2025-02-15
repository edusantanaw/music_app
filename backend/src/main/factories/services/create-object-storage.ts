import { CreateObjectStorageObject } from "../../../services/create-objectstorage-image";
import { S3Service } from "../../../services/s3-service";
import { Log } from "../../config";

export function createObjectStorageFactory(bucket: string) {
  const s3Service = new S3Service(new Log("create-objectstorage-s3"));
  return new CreateObjectStorageObject(s3Service, bucket);
}
