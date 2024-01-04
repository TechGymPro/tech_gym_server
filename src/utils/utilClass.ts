import { signInWithEmailAndPassword } from "firebase/auth";
import { authClient } from "../firebase/client";
import prisma from "../db/client";

class UtilClass {
  async loginFirebase(password: string, email: string) {
    try {
      const response = await signInWithEmailAndPassword(
        authClient,
        email,
        password
      );
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { UtilClass };
