import { Request, Response } from "express";
import { DataUserService } from "../../service/user/dataUserService";

const service = new DataUserService();

class DataUserController {
  static async updateUserInfo(req: Request, res: Response) {
    try {
      const { id, email, password, name, objective, birthday } = req.body;
      if (!id) {
        return res.status(400).json({ message: "Body is missing id" });
      }

      const response = await service.updateUserInfo(
        id,
        email,
        password,
        name,
        objective,
        birthday
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async updateUserInfoHeightWeight(req: Request, res: Response) {
    try {
      const { id, height, actualWeight, wishedWeight, objective , initialWeight} = req.body;
      if (!id) {
        return res.status(400).json({ message: "Body is missing id" });
      }

      if (wishedWeight || actualWeight) {
        if (!wishedWeight || !actualWeight) {
          return res
            .status(400)
            .json({ message: "Body hasn't one of the weight" });
        }
      }
      const response = await service.updateUserInfoHeightWeight(
        id,
        height,
        actualWeight,
        wishedWeight,
        initialWeight,
        objective
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async getUserNotifications(req: Request, res: Response) {
    try {
      const gymId = req.params.gymId;

      if (!gymId) {
        return res.status(400).json({ message: "GymId is missing" });
      }

      const response = await service.getUserNotifications(Number(gymId));

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
  static async getUserData(req: Request, res: Response) {
    try {
      const id = req.headers.id as string
      console.log(id, "userId")
      if (!id) {
        return res.status(400).json({ message: "id is missing" });
      }
      const response = await service.getUserData(id);
      console.log(response, "response")

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async getUserTraining(req: Request, res: Response) {
    try {
      // const { gymId } = req.params;
      const { userId } = req.query;
      const gymId = req.params.gymId|| req.headers.gymId 

      if (!gymId) {
        return res.status(400).json({ message: "GymId is missing" });
      }

      const response = await service.getUserTraining(
        Number(gymId),
        String(userId)
      );

      return res.status(200).json(response);
      
    } catch (error: any) {
      console.log(error)
      return res.status(401).json({ message: error.message });
    }
  }
}

export { DataUserController };
