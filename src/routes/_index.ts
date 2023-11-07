import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { dataRoutes } from "./data.routes";

const appRoutes = Router();

appRoutes.use(authRoutes);
appRoutes.use(dataRoutes);

export default appRoutes;
