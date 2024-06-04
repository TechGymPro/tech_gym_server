import { Router } from "express";
import { AuthCoachController } from "../../controller/coach/authCoachController";


const authCoachRoutes = Router();

const USER_BASE_PATH = "/auth-coach";
// PUT
authCoachRoutes.put(`${USER_BASE_PATH}/changeStudentTraining/:idUser/:trainingId`, AuthCoachController.changeStudentTraining);
authCoachRoutes.put(`${USER_BASE_PATH}/updateStudent/:studentId`, AuthCoachController.updateStudent);

// DELETE
authCoachRoutes.delete(`${USER_BASE_PATH}/deleteStudent/:idUser`, AuthCoachController.deleteStudent);

// POST
authCoachRoutes.get(`${USER_BASE_PATH}/getUserById/:studentId`, AuthCoachController.getUserById);
authCoachRoutes.post(`${USER_BASE_PATH}/createStudent/`, AuthCoachController.createStudent);
authCoachRoutes.post(`${USER_BASE_PATH}/login`, AuthCoachController.Login);

export { authCoachRoutes };
