import { AuthCoachRepository } from "../../repository/coach/authCoachRepo";
import { DataUserRepository } from "../../repository/user/dataUserRepo";
import { UtilClass } from "../../utils/utilClass";

const repo = new AuthCoachRepository();
const repoUser = new DataUserRepository();
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
  async updateStudent(
   {
    gymId,
    name,
    email,
    cpf,
    birthday,
    phone,
    objective,
    trainingId,
    password,
    idUser,
  }: {
    gymId: number;
    name: string;
    email: string;
    cpf: string;
    birthday: string;
    phone: string;
    objective: number;
    trainingId: number;
    password: string;
    idUser: string;
  }
  ) {
    try {
      const original = await repoUser.getUserData(idUser);
      if(!original){
        throw new Error("usuario nao encontrado")
      }
      let update:any={
       student_name:name,
       student_cpf:cpf,
       student_birth:birthday,
       student_phone:phone,
       objective_id:objective,
       training_id:trainingId,
      } 
      if (email && original?.student_email!== email) {
        const response = await repoUser.updateUserEmail(email, idUser);
        update.student_email = email;
        if (!response) {
          throw new Error("Email failed to update");
        }
      }
      if (password) {
        const response = await repoUser.updateUserPassword(password, idUser);
        if (!response) {
          throw new Error("Password failed to update");
        }
      }
      const result = await repoUser.updateStudentData(
       idUser,{
        ...update,
       }
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
  async getUserById(idUser: string) {
    try {

      let result = await repo.getUserById(idUser);

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
