"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./user/auth.routes");
const data_routes_1 = require("./user/data.routes");
const appRoutes = (0, express_1.Router)();
appRoutes.use(auth_routes_1.authRoutes);
appRoutes.use(data_routes_1.dataRoutes);
exports.default = appRoutes;
//# sourceMappingURL=_index.js.map