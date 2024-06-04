import prisma from "../../db/client";
import { authAdmin } from "../../firebase/admin";
import { TrainingData, TrainingDivisionExercise } from "../../types";

class DataCoachRepository {
  async updateCoachEmail(email: string, id: string) {
    try {
      await authAdmin.updateUser(id, { email });

      await prisma.coach.update({
        where: {
          coach_id: id,
          deleted_date: null,

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
          deleted_date: null,

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
          deleted_date: null,

        },
      });
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getObjetiveList(gymId: number) {
    try {
      const result = await prisma.objectives.findMany({
        where: {
          gym_id: gymId,
          deleted_date: null,

        },
      });
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteStudent(gymId: number, student_id: string) {
    try {
      const result = await prisma.student.update({
        where: {
          gym_id: gymId,
          student_id:student_id

        },
        data: {
          deleted_date: new Date(),
        }
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

  async getTraining(gymId: number, idTraining: number) {
    try {
      const result = await prisma.training.findUnique({
        where: {
          training_id: idTraining,
          gym_id: gymId,
          deleted_date: null,
          // training_division_option:{
            
          // },
          // training_division:{
            
          // }
        },
        include:{
          training_division:{
            include:{
              training_division_exercise:true
            }
          },
          training_division_option:true,
          
        }
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
          deleted_date: null,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async updateTraining(data: TrainingData) {
    try {
      const result = await prisma.training.update({
        where: {
          gym_id: data.gym_id,
          training_id: Number(data.training_id),
          deleted_date: null,
        },
        data:{
          training_name: data.training_name,
          training_division_option_id: data.training_division_option_id,
          objective_id: data.objective_id,
        }
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getExercieis(gymId: number) {
    try {
      const result = await prisma.exercise.findMany({
        where: {
          gym_id: gymId,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async patchTrainingExercieis({ trainingDivisionId,idsExercises}:
    {idTrainingExercise:number,trainingDivisionId:number ,idsExercises: number[]}) {
    try {
      let idsToCreate:number[] = []
      
      // idsExercises.forEach((id) => {
      //   if(!idsToCreate.includes(id)){
      //     idsToCreate.push(id)
      //   }
      // })
      const exist = trainingDivisionId && await prisma.training_division_exercise.updateMany({
        where:  {
          training_division_id: trainingDivisionId,
          deleted_date: null,
          exercise_id:{notIn: idsExercises },
      },
        data: {
          deleted_date: new Date(),
        }
      } )
      console.log(exist,"EXIST")
      const create = trainingDivisionId && await prisma.training_division_exercise.createMany(
        {
        data: idsExercises.map((id) => ({
          training_division_id: trainingDivisionId,
          exercise_id: id,
          created_date: new Date(),
          updated_date: new Date(),
        })),
      })
  
      
      return true;
    }
    catch (error: any) {
      throw new Error(error);
    }
  }
  async patchTrainingDivision({ trainingDivisionExercise , training_division_option_id, training_id}:
    {trainingDivisionExercise:TrainingDivisionExercise[],training_division_option_id:number ,training_id: number}) {
    try {
      const trainingReceive= trainingDivisionExercise
      let idsToCreate:TrainingDivisionExercise[] =  trainingReceive.filter((item) => !item.trainingDivisionId)
      let idsToUpdate:TrainingDivisionExercise[] =  trainingReceive.filter((item) => item.trainingDivisionId > 0)
    
      idsToCreate &&idsToCreate.length>0&& idsToCreate.forEach(async (item) => {
      const trainingCreate=  await prisma.training_division.create({
         data: {
            training_serie_name: item.trainingDivisionName,
            updated_date: new Date(),
            created_date: new Date(),
            letter: item.trainingDivisionLetter,
            training_id:training_id
          },
        });
        const existExercice = await prisma.training_division_exercise.findMany({
          where:{training_division_id:item.trainingDivisionId}
        })
        let newIdsExercises = item.idsExercise.filter((id) => !existExercice.map((item) => item.exercise_id).includes(id))  
        newIdsExercises&& newIdsExercises.length>0&&  await prisma.training_division_exercise.createMany(
          {
          data:newIdsExercises.map((id) => ({
            training_division_id: trainingCreate.training_id,
            exercise_id: id,
            created_date: new Date(),
            updated_date: new Date(),
          })),
        })
      })
        
      idsToUpdate &&idsToUpdate.length>0 && idsToUpdate.forEach(async (item) => {
      const trainingCreate=  await prisma.training_division.update({
        where:{
          training_division_id:item.trainingDivisionId
        },
         data: {
            training_serie_name: item.trainingDivisionName,
            updated_date: new Date(),
            created_date: new Date(),
            letter: item.trainingDivisionLetter,
            training_id:training_id
          },
        });
        await prisma.training_division_exercise.createMany(
          {
          data: item.idsExercise.map((id) => ({
            training_division_id: trainingCreate.training_id,
            exercise_id: id,
            created_date: new Date(),
            updated_date: new Date(),
          })),
        })
      })
        
      
      // idsExercises.forEach((id) => {
      //   if(!idsToCreate.includes(id)){
      //     idsToCreate.push(id)
      //   }
      // })
    
      // const create = trainingDivisionId && await prisma.training_division_exercise.createMany(
      //   {
      //   data: idsExercises.map((id) => ({
      //     training_division_id: trainingDivisionId,
      //     exercise_id: id,
      //     created_date: new Date(),
      //     updated_date: new Date(),
      //   })),
      // })
      return true;
    }
    catch (error: any) {
      throw new Error(error);
    }
  }
  async divisionList(training_id: number) {
    try {
      const result = await prisma.training_division.findMany({
        where: {
          training_id: training_id,
          deleted_date: null,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getTrainingDivisionOptions(gymId: number) {
    try {
      const result = await prisma.training_division_option.findMany({
        where: {
          gym_id: gymId,
          deleted_date: null,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteTraining(training_id: number) {
    try {
      const result = await prisma.training.update({
        where: {
          training_id: training_id,
        },
        data: {
          deleted_date: new Date(),
        }
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
