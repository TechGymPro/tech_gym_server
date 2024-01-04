import { Router } from "express";
import { AuthCoachController } from "../../controller/coach/authCoachController";


const authCoachRoutes = Router();

const USER_BASE_PATH = "/auth-coach";

authCoachRoutes.post(`${USER_BASE_PATH}/login`, AuthCoachController.Login);

export { authCoachRoutes };