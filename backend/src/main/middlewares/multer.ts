import multer, { StorageEngine } from "multer";
import path from "path";
import crypto from "crypto";

export class CreateMulterMiddleware {
  protected basePath: string;
  protected storageName: string;
  constructor(storageName: string) {
    this.storageName = storageName;
    this.basePath = process.env.LOCAL_IMAGE_BASE_PATH!;
  }

  public upload() {
    const storage = this.createStorage();
    return multer({
      storage,
      limits: {
        fileSize: 4 * 1024 * 1024,
      },
      fileFilter: (_, file, cb) => {
        const allowedMimes = [
          "image/jpeg",
          "image/pjpeg",
          "image/png",
          "image/webp",
        ];

        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error("File type is invalid!"));
        }
      },
    });
  }

  protected createStorage() {
    const storage: StorageEngine = multer.diskStorage({
      destination: (_, __, cb) => {
        cb(
          null,
          path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            `./${this.basePath}/${this.storageName}`
          )
        );
      },
      filename: (_, file, cb) => {
        console.log(file)
        const fileHash = crypto.randomBytes(16).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;
        cb(null, fileName);
      },
    });
    return storage;
  }
}
