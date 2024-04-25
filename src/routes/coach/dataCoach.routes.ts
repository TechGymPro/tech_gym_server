import { Router } from "express";
import { DataCoachController } from "../../controller/coach/dataCoachController";


const dataCoachRoutes = Router();

const USER_BASE_PATH = "/data/coach";
//GET
dataCoachRoutes.get(`${USER_BASE_PATH}/getCoachNotifications/:gymId`, DataCoachController.getCoachNotifications);
dataCoachRoutes.get(`${USER_BASE_PATH}/getUsersList/:gymId`, DataCoachController.getUsersList);
dataCoachRoutes.get(`${USER_BASE_PATH}/getTrainings/:gymId`, DataCoachController.getTrainings);
//PUT
dataCoachRoutes.put(`${USER_BASE_PATH}/updateCoach`, DataCoachController.updateCoachInfos);
// POST
dataCoachRoutes.post(`${USER_BASE_PATH}/postNews/:gymId`, DataCoachController.postNews);
dataCoachRoutes.post(`${USER_BASE_PATH}/createTraining/:gymId`, DataCoachController.createTraining);
dataCoachRoutes.post(`${USER_BASE_PATH}/createDivision`, DataCoachController.createDivision);

export { dataCoachRoutes };