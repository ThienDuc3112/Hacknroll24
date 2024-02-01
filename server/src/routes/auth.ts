import { Router } from "express";
import { loginController } from "../controllers/loginController";

const authRouter = Router();

authRouter.get("/login", loginController);

export default authRouter;
