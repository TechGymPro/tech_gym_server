import { signInWithEmailAndPassword } from "firebase/auth";
import { authClient } from "../../firebase/client";
import prisma from "../../db/client";

class AuthUserRepository {
  async loginStudentBD(id: string, email: string) {
    try {
      const student = await prisma.student.findUnique({
        where: {
          student_id: id,
          student_email: email,
        },
      });
      if (student) {
        return student;
      } else {
        throw new Error("Usuário não existente");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { AuthUserRepository };
