import { Request, Response } from "express";
import { spotifyWebAPI } from "..";
import { Room } from "../helpers/Room";
import { normalizeQueueSong } from "../helpers/NormalizeQueue";

const rooms = new Map<string, Room>();

export const createRoom = (req: Request, res: Response) => {
  const code = req.body.code;
  if (!code) return res.status(400).send({ message: "No code" });
  let accessToken: string | undefined;
  let refreshToken: string | undefined;
  spotifyWebAPI.authorizationCodeGrant(code, (err, tokenRes) => {
    if (err) {
      console.error(err);
      return res.status(400).send(err);
    }
    accessToken = tokenRes.body.access_token;
    refreshToken = tokenRes.body.refresh_token;
    let roomId = Math.floor(Math.random() * 36 ** 4).toString(36);
    while (rooms.has(roomId)) {
      roomId = Math.floor(Math.random() * 36 ** 4).toString(36);
    }
    rooms.set(roomId, new Room(roomId, accessToken, refreshToken));
    res.json({ id: roomId });
  });
};

export const joinRoom = async (req: Request, res: Response) => {
  const room = rooms.get(req.params.id);
  if (!room) return res.sendStatus(400);
  const [data, err] = await room.getQueue<any>();
  if (err) return res.status(400).json(err);
  const json = normalizeQueueSong(data);
  res.json(json);
};

export const skipBackward = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  if (!rooms.has(roomId)) return res.status(404).send();
  await rooms.get(roomId)?.spotifyClient.skipToPrevious();
  return res.status(200).send();
};

export const skipForward = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  if (!rooms.has(roomId)) return res.status(404).send();
  await rooms.get(roomId)?.spotifyClient.skipToNext();
  return res.status(200).send();
};
