import { DataCoachRepository } from "../../repository/coach/dataCoachRepo";

const repo = new DataCoachRepository();

class DataCoachService {
  // async updateCoachInfo(
  //   id: string,
  //   email: string | undefined | null,
  //   password: string | undefined | null,
  //   name: string | undefined | null,
  //   objective: number | null,
  //   birthday: string | undefined | null
  // ) {
  //   try {
  //     if (email) {
  //       const response = await repo.updateCoachEmail(email, id);
  //       if (!response) {
  //         throw new Error("Email failed to update");
  //       }
  //     }

  //     if (password) {
  //       const response = await repo.updateCoachPassword(password, id);
  //       if (!response) {
  //         throw new Error("Password failed to update");
  //       }
  //     }

  //     if (name) {
  //       const response = await repo.updateCoachName(name, id);
  //       if (!response) {
  //         throw new Error("Name failed to update");
  //       }
  //     }

  //     if (objective) {
  //       const response = await repo.updateCoachObjective(objective, id);
  //       if (!response) {
  //         throw new Error("Objective failed to update");
  //       }
  //     }

  //     if (birthday) {
  //       const response = await repo.updateCoachBirthday(birthday, id);
  //       if (!response) {
  //         throw new Error("Birthday failed to update");
  //       }
  //     }
  //     return "success";
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }

  // async updateCoachInfoHeightWeight(
  //   id: string,
  //   height: number,
  //   actualWeight: number,
  //   wishedWeight: number,
  //   objective: number
  // ) {
  //   try {
  //     if (height) {
  //       const response = await repo.updateCoachHeight(height, id);
  //       if (!response) {
  //         throw new Error("Height failed to update");
  //       }
  //     }

  //     const initialWeight = await repo.testFirstWeight(id);

  //     if (initialWeight?.student_initial_weight) {
  //       const updateCoachActualWeight = await repo.updateCoachActualWeight(
  //         actualWeight,
  //         id
  //       );
  //       if (!updateCoachActualWeight) {
  //         throw new Error("Actual weight failed to update");
  //       }
  //     } else {
  //       const updateCoachInitialWeight = await repo.updateCoachInitialWeight(
  //         actualWeight,
  //         id
  //       );
  //       if (!updateCoachInitialWeight) {
  //         throw new Error("Initial weight failed to update");
  //       }

  //       const updateCoachActualWeight = await repo.updateCoachActualWeight(
  //         actualWeight,
  //         id
  //       );
  //       if (!updateCoachActualWeight) {
  //         throw new Error("Actual weight failed to update");
  //       }
  //     }

  //     if (objective) {
  //       const response = await repo.updateCoachObjective(objective, id);
  //       if (!response) {
  //         throw new Error("Objective failed to update");
  //       }
  //     }

  //     if (wishedWeight) {
  //       const response = await repo.updateCoachWishedWeight(wishedWeight, id);
  //       if (!response) {
  //         throw new Error("Wished height failed to update");
  //       }
  //     }

  //     return "success";
  //   } catch (error: any) {
  //     console.log(error);
  //     throw new Error(error);
  //   }
  // }

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

  // async getCoachTraining(gymId: number, coachId: string) {
  //   try {
  //     const response = await repo.getCoachTraining(gymId, coachId);

  //     return response;
  //   } catch (error: any) {
  //     throw new Error(error);
  //   }
  // }
}

export { DataCoachService };
