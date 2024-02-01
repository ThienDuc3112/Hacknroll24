import { Router } from "express";
import { searchController } from "../controllers/songController";

const songRoute = Router();

songRoute.get("/search/:song", searchController);

export default songRoute;
