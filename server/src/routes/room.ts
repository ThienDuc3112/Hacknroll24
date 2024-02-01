import { Router } from "express";
import { createRoomController } from "../controllers/roomController";

const roomRoute = Router();

roomRoute.get("/new", createRoomController);

export default roomRoute;
