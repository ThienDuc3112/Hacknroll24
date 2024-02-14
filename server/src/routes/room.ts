import { Router } from "express";
import {
  createRoom,
  joinRoom,
  skipBackward,
  skipForward,
} from "../controllers/roomController";

const roomRoute = Router();

roomRoute.post("/new", createRoom);
roomRoute.get("/join/:id", joinRoom);
roomRoute.get("/:roomId/forward", skipForward);
roomRoute.get("/:roomId/backward", skipBackward);

export default roomRoute;
