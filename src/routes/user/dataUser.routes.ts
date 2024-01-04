import { Router } from "express";
import { DataUserController } from "../../controller/user/dataUserController";


const dataUserRoutes = Router();

const USER_BASE_PATH = "/data/user";
//GET
dataUserRoutes.get(`${USER_BASE_PATH}/getUserNotifications/:gymId`, DataUserController.getUserNotifications);
dataUserRoutes.get(`${USER_BASE_PATH}/getUserTraining/:gymId`, DataUserController.getUserTraining);
//PUT
dataUserRoutes.put(`${USER_BASE_PATH}/updateUser`, DataUserController.updateUserInfo);
dataUserRoutes.put(`${USER_BASE_PATH}/updateHeightWeight`, DataUserController.updateUserInfoHeightWeight);


export { dataUserRoutes };