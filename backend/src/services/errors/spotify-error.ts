import { ServiceError } from "./ServiceError";

export class SpotifyError extends ServiceError {
  constructor(message?: string) {
    super(message);
    this.name = "SpotifyError";
  }
}
