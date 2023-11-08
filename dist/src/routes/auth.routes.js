"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authUserController_1 = require("../controller/authUserController");
const authRoutes = (0, express_1.Router)();
exports.authRoutes = authRoutes;
const USER_BASE_PATH = "/auth-user";
authRoutes.post(`${USER_BASE_PATH}/login`, authUserController_1.AuthUserController.Login);
