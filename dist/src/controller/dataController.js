"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataController = void 0;
const dataService_1 = require("../service/dataService");
const service = new dataService_1.DataService();
class DataController {
    static async getVaccines(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "send id" });
            }
            const response = await service.getVaccines(Number(id));
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(401).json({ message: error });
        }
    }
    static async getUsers(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "send id" });
            }
            const response = await service.getUsers(id);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(401).json({ message: error });
        }
    }
}
exports.DataController = DataController;
