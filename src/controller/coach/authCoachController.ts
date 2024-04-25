import { Response, Request } from "express";
import { AuthCoachService } from "../../service/coach/authCoachService";
import { checkMissingField } from "../../utils";

const service = new AuthCoachService();

class AuthCoachController {
  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      checkMissingField(email, "email");
      checkMissingField(password, "password");

      const login = await service.auth(password, email);

      return res.status(200).json({ login });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async createStudent(req: Request, res: Response) {
    try {
      const { gymId } = req.params;
      const {
        name,
        email,
        cpf,
        birthday,
        phone,
        objective,
        trainingId,
        password,
      } = req.body;

      checkMissingField(gymId, "gymId");
      checkMissingField(name, "name");
      checkMissingField(email, "email");
      checkMissingField(cpf, "cpf");
      checkMissingField(birthday, "birthday");
      checkMissingField(phone, "phone");
      checkMissingField(objective, "objective");
      checkMissingField(trainingId, "trainingId");
      checkMissingField(password, "password");

      const response = await service.createStudent(
        Number(gymId),
        name,
        email,
        cpf,
        birthday,
        phone,
        Number(objective),
        Number(trainingId),
        password
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      console.log(idUser)
      checkMissingField(idUser, "idUser");

      const response = await service.deleteStudent(idUser);

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static async changeStudentTraining(req: Request, res: Response) {
    try {
      const { idUser, trainingId } = req.params;

      checkMissingField(idUser, "idUser");
      checkMissingField(trainingId, "trainingId");

      const response = await service.changeStudentTraining(
        idUser,
        Number(trainingId)
      );

      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export { AuthCoachController };
