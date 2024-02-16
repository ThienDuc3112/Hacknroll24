import { Request, Response } from "express";
import { spotifyWebAPI } from "..";
import { ISong } from "../interfaces/song";

export const searchController = async (req: Request, res: Response) => {
  const song = req.params["song"];
  try {
    const data = (await spotifyWebAPI.searchTracks(song)).body;
    res.json(
      data.tracks?.items.map((song) => {
        const simplifiedSong: ISong = {
          id: song.id,
          name: song.name,
          cover: song.album.images[0].url,
          artists: song.artists.map((artist) => artist.name),
          url: song.external_urls.spotify,
          duration: song.duration_ms,
        };
        return simplifiedSong;
      })
    );
  } catch (error) {
    res.json(error);
  }
};
