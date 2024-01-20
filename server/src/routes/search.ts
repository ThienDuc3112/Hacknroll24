import { Router } from "express";
import { searchController } from "../controllers/searchController";

const searchRoute = Router();

searchRoute.get("/search/:song", searchController);

export default searchRoute;
