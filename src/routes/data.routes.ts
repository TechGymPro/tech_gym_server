import { Router } from "express";
import { DataUserController } from "../controller/dataUserController";


const dataRoutes = Router();

const USER_BASE_PATH = "/data/user";
//GET
dataRoutes.get(`${USER_BASE_PATH}/getUserNotifications/:gymId`, DataUserController.getUserNotifications);
dataRoutes.get(`${USER_BASE_PATH}/getUserTraining/:gymId`, DataUserController.getUserTraining);
//PUT
dataRoutes.put(`${USER_BASE_PATH}/updateUser`, DataUserController.updateUserInfo);
dataRoutes.put(`${USER_BASE_PATH}/updateHeightWeight`, DataUserController.updateUserInfoHeightWeight);


export { dataRoutes };