import { Response, Request } from "express";
import { DataCoachService } from "../../service/coach/dataCoachService";

const service = new DataCoachService();

class DataCoachController {
  // static async updateCoachInfo(req: Request, res: Response) {
  //   try {
  //     const { id, email, password, name, objective, birthday } = req.body;
  //     if (!id) {
  //       return res.status(400).json({ message: "Body is missing id" });
  //     }

  //     const response = await service.updateCoachInfo(
  //       id,
  //       email,
  //       password,
  //       name,
  //       objective,
  //       birthday
  //     );

  //     return res.status(200).json(response);
  //   } catch (error: any) {
  //     return res.status(401).json({ message: error.message });
  //   }
  // }

  // static async updateCoachInfoHeightWeight(req: Request, res: Response) {
  //   try {
  //     const { id, height, actualWeight, wishedWeight, objective } = req.body;
  //     if (!id) {
  //       return res.status(400).json({ message: "Body is missing id" });
  //     }

  //     if (wishedWeight || actualWeight) {
  //       if (!wishedWeight || !actualWeight) {
  //         return res
  //           .status(400)
  //           .json({ message: "Body hasn't one of the weight" });
  //       }
  //     }
  //     const response = await service.updateCoachInfoHeightWeight(
  //       id,
  //       height,
  //       actualWeight,
  //       wishedWeight,
  //       objective
  //     );

  //     return res.status(200).json(response);
  //   } catch (error: any) {
  //     return res.status(401).json({ message: error.message });
  //   }
  // }

  static async getCoachNotifications(req: Request, res: Response) {
    try {
      const gymId = req.params.gymId;

      if (!gymId) {
        return res.status(400).json({ message: "GymId is missing" });
      }

      const response = await service.getCoachNotifications(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async getUsersList(req: Request, res: Response) {
    try {
      const { gymId } = req.params;
      const { coachId } = req.query;

      if (!gymId) {
        return res.status(400).json({ message: "GymId is missing" });
      }

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

      if (!gymId) {
        return res.status(400).json({ message: "GymId is missing" });
      }

      if (typeof coachId !== "string") {
        return res.status(400).json({ message: "CoachId is missing" });
      }

      if (!notificationsType) {
        return res
          .status(400)
          .json({ message: "notificationsType is missing" });
      }

      if (!text) {
        return res.status(400).json({ message: "text is missing" });
      }

      if (!title) {
        return res.status(400).json({ message: "title is missing" });
      }

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
      if (!id) {
        return res.status(400).json({ message: "Id is missing id" });
      }

      if (!email) {
        return res.status(400).json({ message: "Email is missing id" });
      }

      if (!name) {
        return res.status(400).json({ message: "Name is missing id" });
      }

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
}

export { DataCoachController };
