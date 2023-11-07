"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRepository = void 0;
const client_1 = __importDefault(require("../db/client"));
class DataRepository {
    async getVaccines(idMaster) {
        try {
            const response = await client_1.default.vaccine_list.findMany({
                where: {
                    master_user_id: idMaster,
                },
            });
            return response;
        }
        catch (error) {
            throw new Error(String(error.message));
        }
    }
    async getUsers(idDoctor) {
        try {
            const response = await client_1.default.patients.findMany({
                where: {
                    doctors_id: idDoctor,
                },
            });
            console.log({ response });
            return response;
        }
        catch (error) {
            throw new Error(String(error.message));
        }
    }
}
exports.DataRepository = DataRepository;
