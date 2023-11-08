"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const authRepo_1 = require("../repository/authRepo");
const repo = new authRepo_1.AuthRepository();
class AuthService {
    async auth(password, email) {
        try {
            const firebase = await repo.loginFirebase(password, email);
            const db = await repo.loginStudentBD(firebase.user.uid, email);
            return db;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map