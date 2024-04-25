import prisma from "../../db/client";

class AuthCoachRepository {
  async loginCoachBD(id: string, email: string) {
    try {
      const coach = await prisma.coach.findUnique({
        where: {
          coach_id: id,
          coach_email: email,
        },
      });
      if (coach) {
        return coach;
      } else {
        throw new Error("Usuário não existente");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createStudent(
    id: string,
    gymId: number,
    name: string,
    email: string,
    cpf: string,
    birthday: string,
    phone: string,
    objective: number,
    trainingId: number
  ) {
    try {
      const result = await prisma.student.create({
        data: {
          student_id: id,
          gym_id: gymId,
          student_name: name,
          student_email: email,
          student_cpf: cpf,
          student_birth: new Date(birthday).toISOString(),
          student_phone: phone,
          objective_id: objective,
          training_id: trainingId,
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async checkCPF(gymId: number, cpf: string) {
    try {
      const result = await prisma.student.findMany({
        where: {
          gym_id: gymId,
          student_cpf: cpf,
        },
      });

      return result.length > 0 ? true : false;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteStudent(idUser: string) {
    try {
      await prisma.student.delete({
        where: {
          student_id: idUser,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async changeStudentTraining(idUser: string, trainingId: number) {
    try {
      let result = await prisma.student.update({
        where: {
          student_id: idUser,
        },
        data: {
          training_id: trainingId,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { AuthCoachRepository };
