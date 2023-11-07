"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../service/authService");
const service = new authService_1.AuthService();
class AuthController {
    static async Login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is not valid." });
            }
            if (!password) {
                return res.status(400).json({ message: "Password is not valid." });
            }
            const login = await service.auth(password, email);
            return res.status(200).json({ login });
        }
        catch (error) {
            return res.status(401).json({ message: error });
        }
    }
    static async updateInfosDoctor(req, res) {
        try {
            const { name, id, email, phone } = req.body;
            if (!name || !id || !email || !phone) {
                return res.status(401).json({ message: "Body is not correct" });
            }
            const response = await service.updateInfosDoctor(name, id, email, phone);
            return res.status(200).json(response);
        }
        catch (error) {
            return res.status(401).json({ message: error });
        }
    }
}
exports.AuthController = AuthController;
