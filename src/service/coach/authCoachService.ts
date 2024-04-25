import { User } from "firebase/auth";
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

  async createStudent(
    gymId: number,
    name: string,
    email: string,
    cpf: string,
    birthday: string,
    phone: string,
    objective: number,
    trainingId: number,
    password: string
  ) {
    try {
      let register = await utilClass.createUserFirebase(password, email);

      if (!register || !register.user || !register.user.uid) {
        throw new Error(`Erro ao tentar registrar o usuário`);
      }

      const CheckCPF = await repo.checkCPF(gymId, cpf);

      if (CheckCPF) {
        throw new Error(`CPF já cadastrado`);
      }

      let result = await repo.createStudent(
        register.user.uid,
        gymId,
        name,
        email,
        cpf,
        birthday,
        phone,
        objective,
        trainingId
      );

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteStudent(idUser: string) {
    try {
      let deleteFb = await utilClass.deleteUserFirebase(idUser);

      let result = await repo.deleteStudent(idUser);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async changeStudentTraining(idUser: string, trainingId: number) {
    try {

      let result = await repo.changeStudentTraining(idUser, trainingId);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { AuthCoachService };
