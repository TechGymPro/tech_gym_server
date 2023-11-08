"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClient = exports.appClient = void 0;
// import { API_KEY, APP_ID, AUTH_DOMAIN, MEASUREMENT_ID, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET } from './../../config.env';
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const configClient = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};
exports.appClient = (0, app_1.initializeApp)(configClient);
exports.authClient = (0, auth_1.getAuth)();
//# sourceMappingURL=client.js.map