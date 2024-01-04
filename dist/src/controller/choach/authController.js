"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../../service/user/AuthService");
const service = new AuthService_1.AuthService();
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
            return res.status(401).json({ message: error.message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map