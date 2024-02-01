import { Request, Response } from "express";

const rooms = new Set<string>();

export const createRoomController = (req: Request, res: Response) => {
  let roomId = Math.floor(Math.random() * 36 ** 4).toString(36);
  while (rooms.has(roomId)) {
    roomId = Math.floor(Math.random() * 36 ** 4).toString(36);
  }
  rooms.add(roomId);
  res.json({ id: roomId });
};
