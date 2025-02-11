import { ServiceError } from "./ServiceError";

export class CreateImageError extends ServiceError {
  constructor(message?: string) {
    super(message);
    this.name = "CreateImageError";
  }
}
