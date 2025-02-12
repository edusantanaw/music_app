import { CacheService } from "../../../services/cache-service";
import { SpotifyService } from "../../../services/spotify-service";
import { Log } from "../../config";

export function spotifyServiceFactory() {
  const log = new Log("spotify-service");
  const cacheService = new CacheService();
  return new SpotifyService(cacheService, log);
}
