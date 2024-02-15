import SpotifyWebApi from "spotify-web-api-node";
import { io } from "..";
import { normalizeQueueSong } from "./NormalizeQueue";

export class Room {
  id: string;
  spotifyClient: SpotifyWebApi;
  updateQueueInterval: NodeJS.Timeout;
  previousQueue: any;
  expireAt: number;
  removeSelf: () => any;

  constructor(
    id: string,
    accessToken: string,
    refreshToken: string,
    remove: () => any
  ) {
    this.id = id;
    this.removeSelf = remove;
    this.spotifyClient = new SpotifyWebApi({
      accessToken,
      refreshToken,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_TOKEN,
      redirectUri: process.env.REDIRECT_URI,
    });
    this.expireAt = Date.now() + 3_599_000;
    this.updateQueueInterval = setInterval(async () => {
      if (Date.now() > this.expireAt) return this.destroy();
      const [data, err] = await this.getQueue<any>();
      if (
        !err &&
        JSON.stringify({
          ...normalizeQueueSong(data),
          expireAt: this.expireAt,
        }) != JSON.stringify(this.previousQueue)
      ) {
        // Condition here
        this.previousQueue = {
          ...normalizeQueueSong(data),
          expireAt: this.expireAt,
        };
        io.to(this.id).emit("updateQueue", {
          ...this.previousQueue,
          expireAt: this.expireAt,
        });
      }
    }, 1000);
  }
  async refresh() {
    const res = await this.spotifyClient.refreshAccessToken();
    this.spotifyClient.setAccessToken(res.body.access_token);
    this.expireAt = Date.now() + 3_600_000;
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
    this.removeSelf();
    io.to(this.id).emit("roomDestroyed");
    io.to(this.id).disconnectSockets();
  }
}
