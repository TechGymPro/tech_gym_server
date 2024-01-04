import { AuthUserRepository } from "../../repository/user/authUserRepo";
import { UtilClass } from "../../utils/utilClass";

const repo = new AuthUserRepository();
const utilClass = new UtilClass();

class AuthUserService {
  async auth(password: string, email: string) {
    try {
      const firebase = await utilClass.loginFirebase(password, email);
      const db = await repo.loginStudentBD(firebase.user.uid, email);
      return db;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { AuthUserService };
