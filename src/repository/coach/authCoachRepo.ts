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
}

export { AuthCoachRepository };
