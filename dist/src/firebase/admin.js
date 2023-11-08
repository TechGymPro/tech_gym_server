"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authAdmin = exports.appAdmin = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const configAdmin = {
    credential: (0, app_1.applicationDefault)(),
};
exports.appAdmin = (0, app_1.initializeApp)(configAdmin);
exports.authAdmin = (0, auth_1.getAuth)(exports.appAdmin);
//# sourceMappingURL=admin.js.map