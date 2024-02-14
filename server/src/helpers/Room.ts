import SpotifyWebApi from "spotify-web-api-node";
import { io } from "..";
import { normalizeQueueSong } from "./NormalizeQueue";

export class Room {
  id: string;
  spotifyClient: SpotifyWebApi;
  updateQueueInterval: NodeJS.Timeout;
  previousQueue: any;

  constructor(id: string, accessToken: string, refreshToken: string) {
    this.id = id;
    this.spotifyClient = new SpotifyWebApi({
      accessToken,
      refreshToken,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_TOKEN,
      redirectUri: process.env.REDIRECT_URI,
    });
    this.updateQueueInterval = setInterval(async () => {
      const [data, err] = await this.getQueue<any>();
      if (
        !err &&
        JSON.stringify(normalizeQueueSong(data)) !=
          JSON.stringify(this.previousQueue)
      ) {
        // Condition here
        this.previousQueue = normalizeQueueSong(data);
        io.to(this.id).emit("updateQueue", this.previousQueue);
      }
    }, 2500);
  }
  getAccessToken() {
    return this.spotifyClient.getAccessToken();
  }
  getRefreshToken() {
    return this.spotifyClient.getRefreshToken();
  }
  async getQueue<T>(): Promise<[T, null] | [null, unknown]> {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/player/queue",
        {
          headers: {
            Authorization: `Bearer ${this.spotifyClient.getAccessToken()}`,
          },
        }
      );
      const json = await response.json();
      return [json, null];
    } catch (error) {
      return [null, error];
    }
  }
  destroy() {
    clearInterval(this.updateQueueInterval);
  }
}
