"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const auth_1 = require("firebase/auth");
const client_1 = require("../firebase/client");
const client_2 = __importDefault(require("../db/client"));
const admin_1 = require("../firebase/admin");
class AuthRepository {
    async loginFirebase(password, email) {
        try {
            const response = await (0, auth_1.signInWithEmailAndPassword)(client_1.authClient, email, password);
            return response;
        }
        catch (error) {
            throw new Error(String(error.message));
        }
    }
    async loginBD(id, email) {
        try {
            const doctor = await client_2.default.doctors.findFirst({
                where: {
                    doctors_id: id,
                    doctors_email: email,
                },
            });
            if (doctor) {
                return doctor;
            }
            else {
                const patient = await client_2.default.patients.findFirst({
                    where: {
                        patients_id: id,
                        patients_email: email,
                    },
                });
                if (patient) {
                    return patient;
                }
                else {
                    throw new Error("Usuário não existente");
                }
            }
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
    async updateInfosDoctor(firstName, restName, id, email, phone) {
        try {
            const result = await client_2.default.doctors.update({
                where: {
                    doctors_id: id,
                },
                data: {
                    doctors_email: email,
                    doctors_phone: phone,
                    doctors_first_name: firstName,
                    doctors_rest_names: restName,
                },
            });
            await admin_1.authAdmin.updateUser(id, { email });
            return result;
        }
        catch (error) {
            throw new Error(String(error));
        }
    }
}
exports.AuthRepository = AuthRepository;
