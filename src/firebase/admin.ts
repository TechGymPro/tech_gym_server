
import { AppOptions, applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";


const configAdmin : AppOptions = {
    credential: applicationDefault(),
    storageBucket: process.env.STORAGE_BUCKET,
}

export const appAdmin = initializeApp(configAdmin);

export const authAdmin = getAuth(appAdmin);