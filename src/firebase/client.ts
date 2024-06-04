import { getStorage } from "firebase/storage";

import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const configClient = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

export const appClient = initializeApp(configClient);
export const storageGet = getStorage(appClient)

export const authClient = getAuth();