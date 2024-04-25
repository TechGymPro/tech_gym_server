import prisma from "../../db/client";
import { authAdmin } from "../../firebase/admin";
import { formatDate } from "../../utils";

class DataCoachRepository {
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
      console.log(result);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getCoachNotifications(gymId: number) {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);

      const result = await prisma.notifications_coach.findMany({
        where: {
          gym_id: gymId,
          deleted_date: null,
          expired: 0,
          updated_date: {
            gte: sevenDaysAgo,
          },
        },
        select: {
          notifications_coach_id: true,
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

  async getTrainings(gymId: number) {
    try {
      const result = await prisma.training.findMany({
        where: {
          gym_id: gymId,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createTraining(
    gymId: number,
    trainingDivisionOptionId: number,
    objective: number,
    trainingName: string
  ) {
    try {
      const result = await prisma.training.create({
        data: {
          gym_id: gymId,
          training_division_option_id: trainingDivisionOptionId,
          objective_id: objective,
          training_name: trainingName,
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createDivision(
    trainingId: number,
    trainingDivisionName: string,
    letter: string
  ) {
    try {
      const result = await prisma.training_division.create({
        data: {
          training_id: trainingId,
          training_serie_name: trainingDivisionName,
          letter: letter,
          created_date: new Date().toISOString(),
          updated_date: new Date().toISOString(),
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { DataCoachRepository };
