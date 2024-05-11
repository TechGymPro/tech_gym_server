import { DataCoachRepository } from "../../repository/coach/dataCoachRepo";
import { TrainingData } from "../../types";
import { compare } from "../../utils";

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

  async getObjetiveList(gymId: number) {
    try {
      const response = await repo.getObjetiveList(gymId);

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
  async deleteStudent(gymId: number, student_id: string) {
    try {
      const response = await repo.deleteStudent(gymId,student_id);

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

  async getTraining(gymId: number,idTraining: number) {
    try {
      let result = await repo.getTraining(gymId,idTraining);
      return result;
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
  async putTraining(gymId: number,data:TrainingData) {
    try {
      let isNew = !data.training_id 
      const newTraining = isNew&& await repo.createTraining(gymId,data.training_division_option_id,data.objective_id,data.training_name)
      const idTraining=isNew && newTraining?newTraining.training_id:data.training_id
      let result =await repo.getTraining(gymId,Number(idTraining)) 
      if(!result){
        throw new Error("Training not found");
      } 
      else if(!isNew){
        const update= await repo.updateTrainingDivisionByOptionAndTrainingId(result.training_division_option.training_division_name,result.training_id);
      }
      if(!compare(result.training_name, data.training_name)||
      !compare(result.training_division_option_id, data.training_division_option_id)||
      !compare(result.objective_id, data.objective_id)){
       const update= await repo.updateTraining(data);
       console.log("update",update)

      }
       if(data.trainingDivisionExercise){
      const change= await repo.patchTrainingDivision(
          { trainingDivisionExercise:data.trainingDivisionExercise , training_division_option_id:result.training_division_option_id, training_id:result.training_id}) ;
          console.log("change",change)

          return change
      }
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getExercieis(gymId: number) {
    try {
      let result = await repo.getExercieis(gymId);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async divisionList(gymId: number) {
    try {
      let result = await repo.getTrainings(gymId);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getTrainingDivisionOptions(gymId: number) {
    try {
      let result = await repo.getTrainingDivisionOptions(gymId);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteTraining(trainingId: number) {
    try {
      let result = await repo.deleteTraining(trainingId);
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
