// prettier-ignore
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   deleteUser,
//   User,
//   IdTokenResult,
//   getAuth,
//   onAuthStateChanged,
// } from "firebase/auth";
import { authClient } from "../firebase/client";
// import prisma from "../db/client";
import { authAdmin } from "../firebase/admin";
// import { refreshToken } from "firebase-admin/app";

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

  async createUserFirebase(password: string, email: string) {
    try {
      const response = await createUserWithEmailAndPassword(
        authClient,
        email,
        password
      );
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async deleteUserFirebase(idUser: string) {
    try {
      const response = await authAdmin.deleteUser(idUser);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  async updateEmailPasswordUserFirebase(idUser: string , data:{
    email?:string
    password?:string
  }) {
    try {
      const response = await authAdmin.updateUser(idUser, {
       ...data
      });
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { UtilClass };
