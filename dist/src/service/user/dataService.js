"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const dataUserRepo_1 = require("../../repository/dataUserRepo");
const repo = new dataUserRepo_1.DataRepository();
class DataService {
    async updateUserInfo(id, email, password, name, objective, birthday) {
        try {
            if (email) {
                const response = await repo.updateUserEmail(email, id);
                if (!response) {
                    throw new Error("Email failed to update");
                }
            }
            if (password) {
                const response = await repo.updateUserPassword(password, id);
                if (!response) {
                    throw new Error("Password failed to update");
                }
            }
            if (name) {
                const response = await repo.updateUserName(name, id);
                if (!response) {
                    throw new Error("Name failed to update");
                }
            }
            if (objective) {
                const response = await repo.updateUserObjective(objective, id);
                if (!response) {
                    throw new Error("Objective failed to update");
                }
            }
            if (birthday) {
                const response = await repo.updateUserBirthday(birthday, id);
                if (!response) {
                    throw new Error("Birthday failed to update");
                }
            }
            return "success";
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateUserInfoHeightWeight(id, height, actualWeight, wishedWeight, objective) {
        try {
            if (height) {
                const response = await repo.updateUserHeight(height, id);
                if (!response) {
                    throw new Error("Height failed to update");
                }
            }
            const initialWeight = await repo.testFirstWeight(id);
            if (initialWeight === null || initialWeight === void 0 ? void 0 : initialWeight.student_initial_weight) {
                const updateUserActualWeight = await repo.updateUserActualWeight(actualWeight, id);
                if (!updateUserActualWeight) {
                    throw new Error("Actual weight failed to update");
                }
            }
            else {
                const updateUserInitialWeight = await repo.updateUserInitialWeight(actualWeight, id);
                if (!updateUserInitialWeight) {
                    throw new Error("Initial weight failed to update");
                }
                const updateUserActualWeight = await repo.updateUserActualWeight(actualWeight, id);
                if (!updateUserActualWeight) {
                    throw new Error("Actual weight failed to update");
                }
            }
            if (objective) {
                const response = await repo.updateUserObjective(objective, id);
                if (!response) {
                    throw new Error("Objective failed to update");
                }
            }
            if (wishedWeight) {
                const response = await repo.updateUserWishedWeight(wishedWeight, id);
                if (!response) {
                    throw new Error("Wished height failed to update");
                }
            }
            return "success";
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async getUserNotifications(gymId) {
        try {
            const response = await repo.getUserNotifications(gymId);
            return response;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getUserTraining(gymId, userId) {
        try {
            const response = await repo.getUserTraining(gymId, userId);
            return response;
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.DataService = DataService;
//# sourceMappingURL=dataService.js.map