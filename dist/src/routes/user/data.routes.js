"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataRoutes = void 0;
const express_1 = require("express");
const dataController_1 = require("../../controller/user/dataController");
const dataRoutes = (0, express_1.Router)();
exports.dataRoutes = dataRoutes;
const USER_BASE_PATH = "/data/user";
//GET
dataRoutes.get(`${USER_BASE_PATH}/getUserNotifications/:gymId`, dataController_1.DataUserController.getUserNotifications);
dataRoutes.get(`${USER_BASE_PATH}/getUserTraining/:gymId`, dataController_1.DataUserController.getUserTraining);
//PUT
dataRoutes.put(`${USER_BASE_PATH}/updateUser`, dataController_1.DataUserController.updateUserInfo);
dataRoutes.put(`${USER_BASE_PATH}/updateHeightWeight`, dataController_1.DataUserController.updateUserInfoHeightWeight);
//# sourceMappingURL=data.routes.js.map