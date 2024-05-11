import prisma from "../../db/client";
import { authAdmin } from "../../firebase/admin";
import { formatDate } from "../../utils";

class DataUserRepository {
  async updateUserBirthday(date: string, id: string) {
    try {
      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          student_birth: new Date(formatDate(date)),
        },
      });
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserEmail(email: string, id: string) {
    try {
    await authAdmin.updateUser(id, { email });

      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          student_email: email,
        },
      });
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserPassword(password: string, id: string) {
    try {
      await authAdmin.updateUser(id, { password });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserName(name: string, id: string) {
    try {
      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          student_name: name,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserObjective(objective: number, id: string) {
    try {
      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          objective_id: objective,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserHeight(height: number, id: string) {
    try {
      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          student_height: height,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserInitialWeight(initialHeight: number, id: string) {
    try {
      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          student_initial_weight: initialHeight,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserActualWeight(actualHeight: number, id: string) {
    try {
      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          student_actual_weight: actualHeight,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateUserWishedWeight(wishedWeight: number, id: string) {
    try {
      await prisma.student.update({
        where: {
          student_id: id,
        },
        data: {
          student_wished_weight: wishedWeight,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async testFirstWeight(id: string) {
    try {
      const result = await prisma.student.findUnique({
        where: {
          student_id: id,
        },
        select: {
          student_initial_weight: true,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getUserData(id: string) {
    try {
      const student = await prisma.student.findUnique({
        where: {
          student_id: id,
          deleted_date: null,
        },
      });
      if (student) {
        return student;
      } else {
        throw new Error("Usuário não existente");
      }

      return student;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async updateStudentData(id: string,data:{
    student_email?:string
    student_birth?:Date
    student_height?:number
    student_initial_weight?:number
    student_actual_weight?:number
    student_wished_weight?:number
    student_objective_id?:number
  }) {
    try {
      const student = await prisma.student.findUnique({
        where: {
          student_id: id,
          deleted_date: null,
        },
      });
      if (!student) {
        throw new Error("Usuário não existente");
      }
      console.log(data,"update this shit")
      const result = await prisma.student.update({
        where: {
          student_id: id,
        },
        data,
      });

      return result ? result : student;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserNotifications(gymId: number) {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);

      const result = await prisma.notifications_user.findMany({
        where: {
          gym_id: gymId,
          deleted_date: null,
          expired: 0,
          updated_date: {
            gte: sevenDaysAgo,
          },
        },
        select: {
          notifications_user_id: true,
          notifications_type: true,
          notifications_title: true,
          notifications_text: true,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUserTraining(gymId: number, userId: string) {
    try {
      const exerciseID = await prisma.student.findUnique({
        where: {
          gym_id: gymId,
          deleted_date: null,
          student_id: userId,
        },
        select: {
          training_id: true,
        },
      });

      if (exerciseID?.training_id) {
        let training = await prisma.training.findUnique({
          where: {
            training_id: exerciseID.training_id,
          },
        });

        let training_divisions = await prisma.training_division.findMany({
          where: {
            training_id: training?.training_id,
            deleted_date: null,
          },
          select: {
            training_division_id: true,
            training_serie_name: true,
            letter: true,
          },
        });

        let exercisesArray = await Promise.all(
          training_divisions.map(async (division) => {
            let training_division_exercise =
              await prisma.training_division_exercise.findMany({
                where: {
                  training_division_id: division.training_division_id,
                  deleted_date: null,
                },
                select: {
                  exercise_id: true,
                },
              });
            return training_division_exercise;
          })
        );

        let semiResult = await Promise.all(
          exercisesArray.map(async (exerciseRow, index) => {
            let subResult = await Promise.all(
              exerciseRow.map(async (row) => {
                let result = await prisma.exercise.findUnique({
                  where: {
                    exercise_id: row.exercise_id,
                  },
                });
                return result;
              })
            );
            return subResult;
          })
        );

        const finalResult = training_divisions.map((row, index) => {
          let result = { ...row, exercises: semiResult[index] };
          return result;
        });

        return finalResult;
      } else {
        return [];
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { DataUserRepository };
