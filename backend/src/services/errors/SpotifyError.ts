export class SpotifyError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "SpotifyError";
  }
}
