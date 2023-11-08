"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClient = exports.appClient = void 0;
const config_env_1 = require("./../../config.env");
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const configClient = {
    apiKey: config_env_1.API_KEY,
    authDomain: config_env_1.AUTH_DOMAIN,
    projectId: config_env_1.PROJECT_ID,
    storageBucket: config_env_1.STORAGE_BUCKET,
    messagingSenderId: config_env_1.MESSAGING_SENDER_ID,
    appId: config_env_1.APP_ID,
    measurementId: config_env_1.MEASUREMENT_ID,
};
exports.appClient = (0, app_1.initializeApp)(configClient);
exports.authClient = (0, auth_1.getAuth)();
//# sourceMappingURL=client.js.map