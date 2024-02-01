import { Request, Response } from "express";
import { spotifyWebAPI } from "..";

export const searchController = async (req: Request, res: Response) => {
  const song = req.params["song"];
  console.log(song);
  try {
    const data = (await spotifyWebAPI.searchTracks(song)).body;
    res.json(
      data.tracks?.items.map((song) => {
        return {
          id: song.id,
          name: song.name,
          cover: song.album.images[0].url,
          artists: song.artists.map((artist) => artist.name),
          url: song.external_urls.spotify,
        };
      })
    );
  } catch (error) {
    res.json(error);
  }
};
