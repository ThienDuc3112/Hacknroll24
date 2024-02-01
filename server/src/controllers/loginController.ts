import { Request, Response } from "express";

export const loginController = (req: Request, res: Response) => {
  let scope =
    "user-read-currently-playing%20user-modify-playback-state%20user-read-playback-state";
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scope}&redirect_uri=${process.env.REDIRECT_URI}`
  );
};
