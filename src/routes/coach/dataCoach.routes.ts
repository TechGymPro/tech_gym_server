import { Router } from "express";
import { DataCoachController } from "../../controller/coach/dataCoachController";


const dataCoachRoutes = Router();

const USER_BASE_PATH = "/data/coach";
//GET
dataCoachRoutes.get(`${USER_BASE_PATH}/getCoachNotifications/:gymId`, DataCoachController.getCoachNotifications);
dataCoachRoutes.get(`${USER_BASE_PATH}/getUsersList/:gymId`, DataCoachController.getUsersList);
//PUT
dataCoachRoutes.put(`${USER_BASE_PATH}/updateUserInfos`, DataCoachController.updateCoachInfos);
// dataCoachRoutes.put(`${USER_BASE_PATH}/updateCoach`, DataCoachController.updateCoachInfo);
// dataCoachRoutes.put(`${USER_BASE_PATH}/updateHeightWeight`, DataCoachController.updateCoachInfoHeightWeight);
// POST
dataCoachRoutes.post(`${USER_BASE_PATH}/postNews/:gymId`, DataCoachController.postNews);

export { dataCoachRoutes };