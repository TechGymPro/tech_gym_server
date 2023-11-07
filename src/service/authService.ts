import { AuthRepository } from "../repository/authRepo";

const repo = new AuthRepository();

class AuthService {
  async auth(password: string, email: string) {
    try {
      const firebase = await repo.loginFirebase(password, email);
      const db = await repo.loginStudentBD(firebase.user.uid, email);
      return db;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { AuthService };
