import { Router } from "express";
import {
  add,
  createRoom,
  joinRoom,
  play,
  refresh,
  skipBackward,
  skipForward,
} from "../controllers/roomController";

const roomRoute = Router();

roomRoute.post("/new", createRoom);
roomRoute.get("/join/:id", joinRoom);
roomRoute.get("/:roomId/forward", skipForward);
roomRoute.get("/:roomId/backward", skipBackward);
roomRoute.get("/:roomId/pp", play);
roomRoute.post("/:roomId/add", add);
roomRoute.get("/:roomId/refresh", refresh);

export default roomRoute;
