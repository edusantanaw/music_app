import { NotFoundError } from "../../services/errors/not-found";
import { ServiceError } from "../../services/errors/ServiceError";
import { HttpStatus, IHttpStatus } from "../../utils/http-status";

export class ErrorHandler {
  public static handler(error: unknown): IHttpStatus {
    if (error instanceof NotFoundError) {
      console.log(1000000)
      return HttpStatus.notFound({ message: error.message });
    }
    if (error instanceof ServiceError) {
      return HttpStatus.badRequest({ message: error.message });
    }
    return HttpStatus.serverError();
  }
}
