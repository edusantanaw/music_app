import { CreateLocalImage } from "../../../services/create-local-image";
import { CreateObjectStorageObject } from "../../../services/create-objectstorage-image";
import { S3Service } from "../../../services/s3-service";
import { Log } from "../../config";

export function createObjectStorageFactory(bucket: string) {
  const s3Service = new S3Service(new Log("create-objectstorage-s3"));
  const localImageLog = new Log("create-local-image");
  const createLocalImage = new CreateLocalImage(localImageLog);
  return new CreateObjectStorageObject(s3Service, createLocalImage, bucket);
}
