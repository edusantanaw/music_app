import axios from "axios";
import * as env from "dotenv";
import { Track } from "../@types/tracks";
import { Playlist } from "../infra/entities";
import { Log } from "../main/config";
import { CacheService } from "./cache-service";
import GetSpotifyToken from "./get-spotify-token";
import { ServiceError } from "./errors/ServiceError";

env.config();

export class SpotifyService {
  protected spotifyApi: string;
  protected cacheService: CacheService;
  protected log: Log;

  constructor(cacheService: CacheService, log: Log) {
    this.cacheService = cacheService;
    this.spotifyApi = process.env.SPOTIFY_API!;
    this.log = log;
  }

  public async loadTracksByPlaylist(playlist: Playlist) {
    try {
      const tracksInCache = await this.cacheService.getArray(playlist.id);
      if (tracksInCache) return tracksInCache;

      const headers = await this.createHeaders();
      const response = await axios.get<Track[]>(
        `${this.spotifyApi}/api/tracks?ids=${playlist.tracks.join(",")}`,
        {
          headers,
        }
      );
      const data = response.data;
      await this.cacheService.saveArray({
        data,
        key: playlist.id,
        expireIn: 120,
      });
      return data;
    } catch (error) {
      const { response } = error as { response: { data: string } };
      this.log.error(`Error on get tracks: ${response?.data}`);
      throw new ServiceError(`Error on get tracks: ${response?.data}`)
    }
  }

  protected async createHeaders() {
    const token = await this.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  protected async getToken() {
    const getSpotifyToken = GetSpotifyToken.getInstance();
    const credentials = await getSpotifyToken.getCredentials();
    return credentials.accessToken;
  }
}
