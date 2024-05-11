import { Router } from "express";
import { AuthUserController } from "../../controller/user/authUserController";


const authUserRoutes = Router();

const USER_BASE_PATH = "/auth-user";

authUserRoutes.post(`${USER_BASE_PATH}/login`, AuthUserController.Login);

export { authUserRoutes };
