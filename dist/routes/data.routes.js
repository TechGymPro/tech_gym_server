"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRoutes = void 0;
const express_1 = require("express");
const dataUserController_1 = require("../controller/dataUserController");
const dataRoutes = (0, express_1.Router)();
exports.dataRoutes = dataRoutes;
const USER_BASE_PATH = "/data/user";
//GET
dataRoutes.get(`${USER_BASE_PATH}/getUserNotifications/:gymId`, dataUserController_1.DataUserController.getUserNotifications);
dataRoutes.get(`${USER_BASE_PATH}/getUserTraining/:gymId`, dataUserController_1.DataUserController.getUserTraining);
//PUT
dataRoutes.put(`${USER_BASE_PATH}/updateUser`, dataUserController_1.DataUserController.updateUserInfo);
dataRoutes.put(`${USER_BASE_PATH}/updateHeightWeight`, dataUserController_1.DataUserController.updateUserInfoHeightWeight);
//# sourceMappingURL=data.routes.js.map