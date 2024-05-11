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

// const configClient = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };

export const appClient = initializeApp(configClient);
export const storageGet = getStorage(appClient)



export const authClient = getAuth();
// import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from './../../config.env';
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // const configClient = {
// //   apiKey: process.env.API_KEY,
// //   authDomain: process.env.AUTH_DOMAIN,
// //   projectId: process.env.PROJECT_ID,
// //   storageBucket: process.env.STORAGE_BUCKET,
// //   messagingSenderId: process.env.MESSAGING_SENDER_ID,
// //   appId: process.env.APP_ID,
// //   measurementId: process.env.MEASUREMENT_ID,
// // };

// const configClient = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };

// export const appClient = initializeApp(configClient);

// export const authClient = getAuth();


// import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from './../../config.env';