import axios from "axios";
import qs from "qs";
import * as env from "dotenv";
import { Log } from "../main/config";
import { SpotifyError } from "./errors/SpotifyError";

env.config();

interface SpotifyCredentials {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface Credentials {
  accessToken: string;
  tokenType: string;
  expiresIn: Date;
}

export class GetSpotifyToken {
  protected static _instance: GetSpotifyToken;
  protected accountAPI: string;
  protected log: Log;
  protected credentials: Credentials | null = null;

  constructor() {
    this.accountAPI = process.env.ACCOUNT_SPOTIFY_API!;
    this.log = new Log("get-spotify-token");
  }

  public static getInstance(): GetSpotifyToken {
    if (GetSpotifyToken._instance) return GetSpotifyToken._instance;
    GetSpotifyToken._instance = new GetSpotifyToken();
    return GetSpotifyToken._instance;
  }

  public async getCredentials() {
    if (!this.credentials) {
      this.credentials = await this.refreshToken();
      return this.credentials;
    }
    const currentDate = new Date();
    if (currentDate < this.credentials.expiresIn) return this.credentials;
    this.credentials = await this.refreshToken();
    return this.credentials;
  }

  public async refreshToken() {
    const credentials = await this.getToken();
    const expireIn = new Date();
    expireIn.setSeconds(expireIn.getSeconds() + credentials.expires_in);
    return {
      accessToken: credentials.access_token,
      expiresIn: expireIn,
      tokenType: credentials.token_type,
    };
  }

  protected async getToken(): Promise<SpotifyCredentials> {
    try {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      const basicAuthToken = Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64");

      const data = qs.stringify({
        grant_type: "client_credentials",
      });

      const config = {
        headers: {
          Authorization: `Basic ${basicAuthToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const response = await axios.post<SpotifyCredentials>(
        `${this.accountAPI}/api/token`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      this.log.error(`Error on refresh token: ${error}`);
      throw new SpotifyError(`Error on refresh token ${error}`);
    }
  }
}

export default GetSpotifyToken;
