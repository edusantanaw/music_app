import { IHttpStatus } from "../utils/http-status";

export interface IController {
  handle: (data: any) => Promise<IHttpStatus>;
}
