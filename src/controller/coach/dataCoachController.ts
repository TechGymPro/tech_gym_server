import { Response, Request } from "express";
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
      const { gymId } = req.params;

      checkMissingField(gymId, "gymId");

      const response = await service.getUsersList(Number(gymId));

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
      const { gymId } = req.params;

      checkMissingField(gymId, "gymId");

      const response = await service.getTrainings(Number(gymId));

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
}

export { DataCoachController };
