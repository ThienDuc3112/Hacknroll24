import { ISong } from "../interfaces/song";

export const normalizeQueueSong = (
  data: any
): {
  currentlyPlaying: ISong | null;
  queue: ISong[];
} => {
  return {
    currentlyPlaying: data.currently_playing
      ? {
          id: data.currently_playing.id,
          artists: data.currently_playing.artists.map(
            (artist: any) => artist.name
          ),
          cover: data.currently_playing.album.images[0].url,
          url: data.currently_playing.external_urls.spotify,
          duration: data.currently_playing.duration_ms,
          name: data.currently_playing.name,
        }
      : null,
    queue: data.queue
      ? data.queue.map((song: any) => {
          return {
            id: song.id,
            name: song.name,
            cover: song.album.images[0].url,
            artists: song.artists.map((artist: any) => artist.name),
            url: song.external_urls.spotify,
            duration: song.duration_ms,
          };
        })
      : [],
  };
};
