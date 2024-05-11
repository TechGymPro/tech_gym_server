import { Router } from "express";
import { DataCoachController } from "../../controller/coach/dataCoachController";


const dataCoachRoutes = Router();

const USER_BASE_PATH = "/data/coach";
dataCoachRoutes.get(`${USER_BASE_PATH}/getTraining/:trainingId`, DataCoachController.getTraining);
//GET
dataCoachRoutes.get(`${USER_BASE_PATH}/getCoachNotifications/:gymId`, DataCoachController.getCoachNotifications);
dataCoachRoutes.get(`${USER_BASE_PATH}/getObjetiveList/`, DataCoachController.getObjetiveList);
dataCoachRoutes.get(`${USER_BASE_PATH}/getUsersList/`, DataCoachController.getUsersList);
// dataCoachRoutes.delete(`${USER_BASE_PATH}/deleteStudent/:deleteStudentId`, DataCoachController.deleteStudent);
dataCoachRoutes.get(`${USER_BASE_PATH}/getUsersList/:gymId`, DataCoachController.getUsersList);
dataCoachRoutes.get(`${USER_BASE_PATH}/getTrainings/`, DataCoachController.getTrainings);
dataCoachRoutes.get(`${USER_BASE_PATH}/getExercieis/`, DataCoachController.getExercieis);
dataCoachRoutes.get(`${USER_BASE_PATH}/getExercieis/:exerciseId`, DataCoachController.getExercise);
dataCoachRoutes.get(`${USER_BASE_PATH}/divisionList/`, DataCoachController.divisionList);
dataCoachRoutes.get(`${USER_BASE_PATH}/getTrainingDivisionOptions/`, DataCoachController.getTrainingDivisionOptions);
dataCoachRoutes.get(`${USER_BASE_PATH}/getTrainings/:gymId`, DataCoachController.getTrainings);
//PUT
dataCoachRoutes.put(`${USER_BASE_PATH}/putTraining/:trainingId`, DataCoachController.putTraining);
dataCoachRoutes.put(`${USER_BASE_PATH}/updateCoach`, DataCoachController.updateCoachInfos);
dataCoachRoutes.put(`${USER_BASE_PATH}/updateExercise/:exerciseId`, DataCoachController.updateExercise);

// POST
dataCoachRoutes.post(`${USER_BASE_PATH}/postTraining/`, DataCoachController.postTraining);
dataCoachRoutes.post(`${USER_BASE_PATH}/postNews/:gymId`, DataCoachController.postNews);
dataCoachRoutes.post(`${USER_BASE_PATH}/postExercise/`, DataCoachController.postExercise);
dataCoachRoutes.post(`${USER_BASE_PATH}/createTraining/:gymId`, DataCoachController.createTraining);
dataCoachRoutes.post(`${USER_BASE_PATH}/createDivision`, DataCoachController.createDivision);
//delete
dataCoachRoutes.delete(`${USER_BASE_PATH}/deleteTraining/:trainingId`, DataCoachController.deleteTraining);
dataCoachRoutes.delete(`${USER_BASE_PATH}/deleteExercise/:exerciseId`, DataCoachController.deleteExercise);
export { dataCoachRoutes };
