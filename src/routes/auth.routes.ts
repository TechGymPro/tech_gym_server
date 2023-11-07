import { Router } from "express";
import { AuthUserController } from "../controller/authUserController";


const authRoutes = Router();

const USER_BASE_PATH = "/auth-user";

authRoutes.post(`${USER_BASE_PATH}/login`, AuthUserController.Login);

export { authRoutes };