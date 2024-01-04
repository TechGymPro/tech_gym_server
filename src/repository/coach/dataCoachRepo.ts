import prisma from "../../db/client";
import { authAdmin } from "../../firebase/admin";
import { formatDate } from "../../utils";

class DataCoachRepository {
  // async updateCoachBirthday(date: string, id: string) {
  //   try {
  //     await prisma.coach.update({
  //       where: {
  //         coach_id: id,
  //       },
  //       data: {
  //         coach_birth: new Date(formatDate(date)),
  //       },
  //     });
  //     return true;
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }

  async updateCoachEmail(email: string, id: string) {
    try {
      await authAdmin.updateUser(id, { email });

      await prisma.coach.update({
        where: {
          coach_id: id,
        },
        data: {
          coach_email: email,
        },
      });
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCoachBirthday(id: string, date: string) {
    try {
      await prisma.coach.update({
        where: {
          coach_id: id,
        },
        data: {
          coach_birth: date,
        },
      });
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCoachPassword(password: string, id: string) {
    try {
      await authAdmin.updateUser(id, { password });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCoachName(name: string, id: string) {
    try {
      await prisma.coach.update({
        where: {
          coach_id: id,
        },
        data: {
          coach_name: name,
        },
      });

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUsersList(gymId: number) {
    try {
      const result = await prisma.student.findMany({
        where: {
          gym_id: gymId,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getCoachNotifications(gymId: number) {
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

  async postNews(
    gymId: number,
    coachId: string,
    notificationsType: number,
    text: string,
    title: string
  ) {
    try {
      const result = await prisma.notifications_user.create({
        data: {
          coach_id: coachId,
          gym_id: gymId,
          created_date: new Date(),
          notifications_text: text,
          notifications_title: title,
          notifications_type: notificationsType,
          updated_date: new Date(),
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // async getCoachTraining(gymId: number, userId: string) {
  //   try {
  //     const exerciseID = await prisma.coach.findUnique({
  //       where: {
  //         gym_id: gymId,
  //         deleted_date: null,
  //         coach_id: userId,
  //       },
  //       select: {
  //         training_id: true,
  //       },
  //     });

  //     if (exerciseID?.training_id) {
  //       let training = await prisma.training.findUnique({
  //         where: {
  //           training_id: exerciseID.training_id,
  //         },
  //       });

  //       let training_divisions = await prisma.training_division.findMany({
  //         where: {
  //           training_id: training?.training_id,
  //           deleted_date: null,
  //         },
  //         select: {
  //           training_division_id: true,
  //           training_serie_name: true,
  //           letter: true,
  //         },
  //       });

  //       let exercisesArray = await Promise.all(
  //         training_divisions.map(async (division) => {
  //           let training_division_exercise =
  //             await prisma.training_division_exercise.findMany({
  //               where: {
  //                 training_division_id: division.training_division_id,
  //                 deleted_date: null,
  //               },
  //               select: {
  //                 exercise_id: true,
  //               },
  //             });
  //           return training_division_exercise;
  //         })
  //       );

  //       let semiResult = await Promise.all(
  //         exercisesArray.map(async (exerciseRow, index) => {
  //           let subResult = await Promise.all(
  //             exerciseRow.map(async (row) => {
  //               let result = await prisma.exercise.findUnique({
  //                 where: {
  //                   exercise_id: row.exercise_id,
  //                 },
  //               });
  //               return result;
  //             })
  //           );
  //           return subResult;
  //         })
  //       );

  //       const finalResult = training_divisions.map((row, index) => {
  //         let result = { ...row, exercises: semiResult[index] };
  //         return result;
  //       });

  //       return finalResult;
  //     } else {
  //       return [];
  //     }
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }
}

export { DataCoachRepository };
