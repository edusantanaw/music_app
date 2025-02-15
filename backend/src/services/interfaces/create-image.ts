export interface ICreateImageData {
  path: string
}

export type ICreateImageResponse = {
  url: string;
  filename: string
};

export interface ICreateImage {
  create: (
    data: ICreateImageData
  ) => Promise<ICreateImageResponse>;
}
