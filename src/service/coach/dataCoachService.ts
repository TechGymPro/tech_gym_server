import { DataCoachRepository } from "../../repository/coach/dataCoachRepo";
import { CPFValidator } from "../../utils";

const repo = new DataCoachRepository();

class DataCoachService {
  async getCoachNotifications(gymId: number) {
    try {
      const response = await repo.getCoachNotifications(gymId);

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getUsersList(gymId: number) {
    try {
      const response = await repo.getUsersList(gymId);

      return response;
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
      const response = await repo.postNews(
        gymId,
        coachId,
        notificationsType,
        text,
        title
      );

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async updateCoachInfos(
    id: string,
    birthday: string,
    email: string,
    name: string,
    newPassword?: string
  ) {
    try {
      await repo.updateCoachBirthday(id, birthday);

      await repo.updateCoachEmail(email, id);

      await repo.updateCoachName(name, id);

      if (newPassword) {
        await repo.updateCoachPassword(newPassword, id);
      }

      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getTrainings(gymId: number) {
    try {
      let result = await repo.getTrainings(gymId);
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
      let result = await repo.createTraining(
        gymId,
        trainingDivisionOptionId,
        objective,
        trainingName
      );
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
      let result = await repo.createDivision(
        trainingId,
        trainingDivisionName,
        letter
      );
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { DataCoachService };
