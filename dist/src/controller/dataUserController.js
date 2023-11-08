"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUserController = void 0;
const dataUserService_1 = require("../service/dataUserService");
const service = new dataUserService_1.DataService();
class DataUserController {
    static async updateUserInfo(req, res) {
        try {
            const { id, email, password, name, objective, birthday } = req.body;
            if (!id) {
                return res.status(400).json({ message: "Body is missing id" });
            }
            const response = await service.updateUserInfo(id, email, password, name, objective, birthday);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
    static async updateUserInfoHeightWeight(req, res) {
        try {
            const { id, height, actualWeight, wishedWeight, objective } = req.body;
            if (!id) {
                return res.status(400).json({ message: "Body is missing id" });
            }
            if (wishedWeight || actualWeight) {
                if (!wishedWeight || !actualWeight) {
                    return res
                        .status(400)
                        .json({ message: "Body hasn't one of the weight" });
                }
            }
            const response = await service.updateUserInfoHeightWeight(id, height, actualWeight, wishedWeight, objective);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
    static async getUserNotifications(req, res) {
        try {
            const gymId = req.params.gymId;
            if (!gymId) {
                return res.status(400).json({ message: "GymId is missing" });
            }
            const response = await service.getUserNotifications(Number(gymId));
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
    static async getUserTraining(req, res) {
        try {
            const { gymId } = req.params;
            const { userId } = req.query;
            if (!gymId) {
                return res.status(400).json({ message: "GymId is missing" });
            }
            const response = await service.getUserTraining(Number(gymId), String(userId));
            return res.status(200).json(response);
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ message: error.message });
        }
    }
}
exports.DataUserController = DataUserController;
