import { Router } from "express";
import { createRoom, joinRoom } from "../controllers/roomController";

const roomRoute = Router();

roomRoute.post("/new", createRoom);
roomRoute.get("/join/:id", joinRoom);

export default roomRoute;
