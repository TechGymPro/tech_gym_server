import prisma from "../../db/client";
import { authAdmin } from "../../firebase/admin";
import { Exercise, TrainingData, TrainingDivisionExercise } from "../../types";

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
  async updateTrainingDivisionByOptionAndTrainingId(letters:string, idTraining:number){
    try {
      const splitLetter = letters.split("");
      const result  = await prisma.training_division.updateMany({
        where: {
        AND: [
          {
            letter: {notIn:splitLetter},          },
          {
            training_id: idTraining,
          },
          {
            deleted_date: null,
          },
        ]
        },
        data:{
          deleted_date: new Date(),
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
          deleted_date: null,
        },
      });

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async getExercise(exerciseId:number,gymId: number) {
    try {
      const result = await prisma.exercise.findUnique({
        where: {
          exercise_id: exerciseId,
          gym_id: gymId,
          deleted_date: null,
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
      const isCreating = idsToCreate && idsToCreate.length>0
      const isUpdating = idsToUpdate && idsToUpdate.length>0
      isCreating&& idsToCreate.forEach(async (item) => {
      const trainingCreate=  await prisma.training_division.create({
         data: {
            training_serie_name: item.trainingDivisionName,
            updated_date: new Date(),
            created_date: new Date(),
            letter: item.trainingDivisionLetter,
            training_id:training_id
          },
        });

       const exercice= isCreating && item.idsExercise&& item.idsExercise.length>0&&  await prisma.training_division_exercise.createMany(
          {
          data:item.idsExercise.map((id) => ({
            training_division_id: trainingCreate.training_division_id,
            exercise_id: id,
            created_date: new Date(),
            updated_date: new Date(),
          })),
        })
        console.log(exercice,"exercice")
      })
      console.log(idsToUpdate,"idsToUpdate")
      console.log("------------------------------------idsToUpdate")
      console.log(idsToCreate,"idsToCreate")
      console.log("------------------------------------idsToCrate")
      console.log(trainingReceive,"trainingReceive")
      console.log("------------------------------------Training")
      isUpdating && idsToUpdate.forEach(async (item) => {
        const existExercice = await prisma.training_division_exercise.findMany({
          where:{training_division_id:item.trainingDivisionId , deleted_date:null}
        })
        let newIdsExercises = item.idsExercise && item.idsExercise.length>0 && existExercice && existExercice.length>0? item.idsExercise.filter((id) => !existExercice.map((item) => item.exercise_id).includes(id)) : item.idsExercise
        console.log(newIdsExercises,"newIdsExercises")
      const trainingUpdate=  await prisma.training_division.update({
        where:{
          training_division_id:item.trainingDivisionId
        },
         data: {
            training_serie_name: item.trainingDivisionName,
            updated_date: new Date(),
            // letter: item.trainingDivisionLetter,
            training_id:training_id
          },
        });
        item.idsExercise&& item.idsExercise.length>0 &&   await prisma.training_division_exercise.updateMany({where:{
          training_division_id:item.trainingDivisionId,
          exercise_id:{notIn:item.idsExercise},
          deleted_date: null,
        },
        data:{
          deleted_date: new Date(),
        }})
        console.log(existExercice,"item.existExercice")
        console.log(item.idsExercise,"item.idsExercise")
        console.log(newIdsExercises,"newIdsExercises")
        // const exercice= isCreating && item.idsExercise&& item.idsExercise.length>0&&  await prisma.training_division_exercise.createMany(
        //   {
        //   data:item.idsExercise.map((id) => ({
        //     training_division_id: trainingCreate.training_division_id,
        //     exercise_id: id,
        //     created_date: new Date(),
        //     updated_date: new Date(),
        //   })),
        // })
        const dataCreate = 
           newIdsExercises.map((id) => ({
            training_division_id: item.trainingDivisionId,
            exercise_id: Number(id),
            created_date: new Date(),
            updated_date: new Date(),
            deleted_date:null
           }))
           console.log(dataCreate,"dataCreate")
        newIdsExercises && newIdsExercises.length>0&&   await prisma.training_division_exercise.createMany({data:dataCreate})
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
  async createExercise(exercise:Exercise, gymId:number) {
    try {
     const result = prisma.exercise.create({data:{
      ...exercise,
      gym_id:gymId
     }})
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async updateExercise(exercise:Exercise, gymId:number, exerciseId:number) {
    try {
     const result = prisma.exercise.update({
      where:{exercise_id:exerciseId},
      data:{
      ...exercise,
      gym_id:gymId
     }})
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async deleteExercise(exerciseId:number, gymId:number) {
    try {
      const checkUsability =  await prisma.training_division_exercise.findMany({
        where:{exercise_id:exerciseId,deleted_date:null}
      })
      if(checkUsability.length>0){
        throw new Error("exercise is used in training") // TODO: change to custom error in the future 
      }
      const result = await prisma.exercise.update({
        where: {
          exercise_id: exerciseId,
          gym_id:gymId
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
