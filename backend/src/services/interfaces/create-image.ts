export interface ICreateImageData {
  type: "base64" | "buffer";
  data: string | Buffer;
  filename: string;
  dir: string;
  ext: string;
}

export type ICreateImageResponse = {
  fileDirPath: string;
  url: string;
  filename: string
};

export interface ICreateImage {
  create: (
    data: ICreateImageData
  ) => Promise<ICreateImageResponse>;
}
