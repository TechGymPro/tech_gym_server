"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRepository = void 0;
const client_1 = __importDefault(require("../db/client"));
const admin_1 = require("../firebase/admin");
const utils_1 = require("../utils");
class DataRepository {
    async updateUserBirthday(date, id) {
        try {
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    student_birth: new Date((0, utils_1.formatDate)(date)),
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserEmail(email, id) {
        try {
            await admin_1.authAdmin.updateUser(id, { email });
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    student_email: email,
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserPassword(password, id) {
        try {
            await admin_1.authAdmin.updateUser(id, { password });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserName(name, id) {
        try {
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    student_name: name,
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserObjective(objective, id) {
        try {
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    objective_id: objective,
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserHeight(height, id) {
        try {
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    student_height: height,
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserInitialWeight(initialHeight, id) {
        try {
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    student_initial_weight: initialHeight,
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserActualWeight(actualHeight, id) {
        try {
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    student_actual_weight: actualHeight,
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserWishedWeight(wishedWeight, id) {
        try {
            await client_1.default.student.update({
                where: {
                    student_id: id,
                },
                data: {
                    student_wished_weight: wishedWeight,
                },
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async testFirstWeight(id) {
        try {
            const result = await client_1.default.student.findUnique({
                where: {
                    student_id: id,
                },
                select: {
                    student_initial_weight: true,
                },
            });
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserNotifications(gymId) {
        try {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 8);
            const result = await client_1.default.notifications_user.findMany({
                where: {
                    gym_id: gymId,
                    deleted_date: null,
                    expired: 0,
                    updated_date: {
                        gte: sevenDaysAgo,
                    },
                },
                select: {
                    notifications_user_id: true,
                    notifications_type: true,
                    notifications_title: true,
                    notifications_text: true,
                },
            });
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserTraining(gymId, userId) {
        try {
            const exerciseID = await client_1.default.student.findUnique({
                where: {
                    gym_id: gymId,
                    deleted_date: null,
                    student_id: userId,
                },
                select: {
                    training_id: true,
                },
            });
            if (exerciseID === null || exerciseID === void 0 ? void 0 : exerciseID.training_id) {
                let training = await client_1.default.training.findUnique({
                    where: {
                        training_id: exerciseID.training_id,
                    },
                });
                let training_divisions = await client_1.default.training_division.findMany({
                    where: {
                        training_id: training === null || training === void 0 ? void 0 : training.training_id,
                        deleted_date: null,
                    },
                    select: {
                        training_division_id: true,
                        training_serie_name: true,
                        letter: true,
                    },
                });
                let exercisesArray = await Promise.all(training_divisions.map(async (division) => {
                    let training_division_exercise = await client_1.default.training_division_exercise.findMany({
                        where: {
                            training_division_id: division.training_division_id,
                            deleted_date: null,
                        },
                        select: {
                            exercise_id: true,
                        },
                    });
                    return training_division_exercise;
                }));
                let semiResult = await Promise.all(exercisesArray.map(async (exerciseRow, index) => {
                    let subResult = await Promise.all(exerciseRow.map(async (row) => {
                        let result = await client_1.default.exercise.findUnique({
                            where: {
                                exercise_id: row.exercise_id,
                            },
                        });
                        return result;
                    }));
                    return subResult;
                }));
                const finalResult = training_divisions.map((row, index) => {
                    let result = { ...row, exercises: semiResult[index] };
                    return result;
                });
                return finalResult;
            }
            else {
                return [];
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.DataRepository = DataRepository;
//# sourceMappingURL=dataUserRepo.js.map