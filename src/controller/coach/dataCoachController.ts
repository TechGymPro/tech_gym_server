import { Request, Response } from "express";
import { DataCoachService } from "../../service/coach/dataCoachService";
import { checkMissingField } from "../../utils";
const service = new DataCoachService();

class DataCoachController {
  static async getCoachNotifications(req: Request, res: Response) {
    try {
      const gymId = req.params.gymId;

      checkMissingField(gymId, "gymId");

      const response = await service.getCoachNotifications(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async getUsersList(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id

      checkMissingField(gymId, "gymId");

      const response = await service.getUsersList(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  }
  static async getObjetiveList(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id

      checkMissingField(gymId, "gymId");

      const response = await service.getObjetiveList(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  }
  static async deleteStudent(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id
      const  deleteStudentId  = req.params.deleteStudentId 
      console.log(deleteStudentId)
      console.log(gymId)
      checkMissingField(gymId, "gymId");

      const response = await service.deleteStudent(Number(gymId), deleteStudentId);

      return res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  }

  static async postNews(req: Request, res: Response) {
    try {
      const { gymId } = req.params;
      const { coachId } = req.query;
      const { notificationsType } = req.query;
      const { text, title } = req.body;

      checkMissingField(gymId, "gymId");

      if (typeof coachId !== "string") {
        return res.status(400).json({ message: "CoachId is missing" });
      }

      checkMissingField(notificationsType, "notificationsType");
      checkMissingField(text, "text");
      checkMissingField(title, "title");

      const response = await service.postNews(
        Number(gymId),
        coachId,
        Number(notificationsType),
        text,
        title
      );

      return res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      return res.status(401).json({ message: error.message });
    }
  }

  static async updateCoachInfos(req: Request, res: Response) {
    try {
      const { id, email, newPassword, name, birthday } = req.body;

      checkMissingField(id, "id");
      checkMissingField(email, "email");
      checkMissingField(name, "name");

      const response = await service.updateCoachInfos(
        id,
        birthday,
        email,
        name,
        newPassword ? newPassword : false
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async getTrainings(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id
      checkMissingField(gymId, "gymId");
      const response = await service.getTrainings(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async putTraining(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id
       const body = req.body 
      checkMissingField(gymId, "gymId");
      const response = await service.putTraining( Number(gymId),body );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async postTraining(req: Request, res: Response) {
    try {
      console.log("postTraining")
      const  gymId  = req.params.gymId ||req.headers.gym_id
      const body = req.body 
      console.log(body)
      checkMissingField(gymId, "gymId");
      checkMissingField(body?.training_name, "training");
      const response = await service.putTraining( Number(gymId),body );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async getExercieis(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id
      checkMissingField(gymId, "gymId");
      const response = await service.getExercieis(Number(gymId));
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async getExercise(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id
      const  {exerciseId}  = req.params 
       
      checkMissingField(gymId, "gymId");
      checkMissingField(exerciseId, "exerciseId");
      const response = await service.getExercise(Number(exerciseId),Number(gymId));
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async divisionList(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id
      checkMissingField(gymId, "gymId");
      const response = await service.divisionList(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async getTraining(req: Request, res: Response) {
    try {
      const  gymId  = req.headers.gym_id
      const  {trainingId}  = req.params
      checkMissingField(gymId, "gymId");
      checkMissingField(trainingId, "idTraining");
      const response = await service.getTraining(Number(gymId),Number(trainingId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async getTrainingDivisionOptions(req: Request, res: Response) {
    try {
      const  gymId  = req.params.gymId ||req.headers.gym_id
      checkMissingField(gymId, "gymId");
      const response = await service.getTrainingDivisionOptions(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async deleteTraining(req: Request, res: Response) {
    try {
      console.log("trainingId")
      const  {trainingId}  = req.params
      console.log(trainingId)
      checkMissingField(trainingId, "trainingId");
      const response = await service.deleteTraining(Number(trainingId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async deleteExercise(req: Request, res: Response) {
    try {
      const  {exerciseId}  = req.params
      const  gymId  = req.params.gymId ||req.headers.gym_id
      console.log(exerciseId)
      checkMissingField(exerciseId, "exerciseId");
      checkMissingField(gymId, "gymId");
      const response = await service.deleteExercise(Number(exerciseId), Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async createTraining(req: Request, res: Response) {
    try {
      const { gymId } = req.params;
      const { trainingDivisionOptionId, objective, trainingName } = req.body;

      checkMissingField(gymId, "gymId");
      checkMissingField(trainingDivisionOptionId, "trainingDivisionOptionId");
      checkMissingField(objective, "objective");
      checkMissingField(trainingName, "trainingName");

      const response = await service.createTraining(
        Number(gymId),
        Number(trainingDivisionOptionId),
        Number(objective),
        trainingName
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async createDivision(req: Request, res: Response) {
    try {
      const { trainingId, trainingDivisionName, letter } = req.body;

      checkMissingField(trainingId, "trainingId");
      checkMissingField(trainingDivisionName, "trainingDivisionName");
      checkMissingField(letter, "letter");

      const response = await service.createDivision(
        Number(trainingId),
        trainingDivisionName,
        letter
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async postExercise(req: Request, res: Response) {
    try {
      console.log("AAAA---------------------------------------AAAAAAAAAA---------------------------------AAAA")
      
      const { exercise_name, exercise_url, exercise_qtd_serie,
        exercise_qtd_rep,exercise_obs,exercise_rest_time, type
       } = req.body;
       const  gymId  = req.params.gymId ||req.headers.gym_id
      checkMissingField(exercise_name, "exercise_name");
      checkMissingField(exercise_url, "exercise_url");
      checkMissingField(exercise_qtd_serie, "exercise_qtd_serie");
      checkMissingField(exercise_qtd_rep, "exercise_qtd_rep");
      checkMissingField(exercise_rest_time, "exercise_rest_time");
      checkMissingField(type, "type");
      checkMissingField(gymId, "gymId");
       const exercise = {
        exercise_name, exercise_url,exercise_obs: exercise_obs ?exercise_obs:null, exercise_qtd_serie:Number(exercise_qtd_serie),
        exercise_qtd_rep:Number(exercise_qtd_rep),exercise_rest_time:Number(exercise_rest_time), type
       }
       console.log("PASS VERIFY")
      const response = await service.createExercise(exercise ,Number(gymId))
      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async updateExercise(req: Request, res: Response) {
    try {
      
      const { exercise_name, exercise_url, exercise_qtd_serie,
        exercise_qtd_rep,exercise_obs,exercise_rest_time, type
       } = req.body;
       const  gymId  = req.params.gymId ||req.headers.gym_id
       const  exerciseId  = req.params.exerciseId 
      checkMissingField(exercise_name, "exercise_name");
      checkMissingField(exercise_url, "exercise_url");
      checkMissingField(exercise_obs, "exercise_obs");
      checkMissingField(exercise_qtd_serie, "exercise_qtd_serie");
      checkMissingField(exercise_qtd_rep, "exercise_qtd_rep");
      checkMissingField(exercise_rest_time, "exercise_rest_time");
      checkMissingField(type, "type");
      checkMissingField(gymId, "gymId");
      checkMissingField(exerciseId, "exerciseId");
       const exercise = {
        exercise_name, exercise_url,exercise_obs: exercise_obs, exercise_qtd_serie:Number(exercise_qtd_serie),
        exercise_qtd_rep:Number(exercise_qtd_rep),exercise_rest_time:Number(exercise_rest_time), type
       }
      const response = await service.updateExercise(exercise ,Number(gymId), Number(exerciseId))
      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export { DataCoachController };
