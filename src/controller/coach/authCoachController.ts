import { Response, Request } from "express";
import { AuthCoachService } from "../../service/coach/authCoachService";

const service = new AuthCoachService();

class AuthCoachController {
  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is not valid." });
      }

      if (!password) {
        return res.status(400).json({ message: "Password is not valid." });
      }

      const login = await service.auth(password, email);

      return res.status(200).json({ login });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}

export { AuthCoachController };
