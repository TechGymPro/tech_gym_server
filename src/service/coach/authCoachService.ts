import { AuthCoachRepository } from "../../repository/coach/authCoachRepo";
import { UtilClass } from "../../utils/utilClass";

const repo = new AuthCoachRepository();
const utilClass = new UtilClass();

class AuthCoachService {
  async auth(password: string, email: string) {
    try {
      const firebase = await utilClass.loginFirebase(password, email);
      const db = await repo.loginCoachBD(firebase.user.uid, email);
      return db;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { AuthCoachService };
