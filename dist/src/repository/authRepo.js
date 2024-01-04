"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const auth_1 = require("firebase/auth");
const client_1 = require("../firebase/client");
const client_2 = __importDefault(require("../db/client"));
class AuthRepository {
    async loginFirebase(password, email) {
        try {
            const response = await (0, auth_1.signInWithEmailAndPassword)(client_1.authClient, email, password);
            return response;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async loginStudentBD(id, email) {
        try {
            const student = await client_2.default.student.findUnique({
                where: {
                    student_id: id,
                    student_email: email,
                },
            });
            if (student) {
                return student;
            }
            else {
                throw new Error("Usuário não existente");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async loginCoachBD(id, email) {
        try {
            const coach = await client_2.default.coach.findUnique({
                where: {
                    coach_id: id,
                    coach_email: email,
                },
            });
            if (coach) {
                return coach;
            }
            else {
                throw new Error("Usuário não existente");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=authRepo.js.map