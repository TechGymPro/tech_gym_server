import { Router } from "express";
import { authUserRoutes } from "./user/authUser.routes";
import { dataUserRoutes } from "./user/dataUser.routes";
import { authCoachRoutes } from "./coach/authCoach.routes";
import { dataCoachRoutes } from "./coach/dataCoach.routes";

const appRoutes = Router();

appRoutes.use(authUserRoutes);
appRoutes.use(dataUserRoutes);
appRoutes.use(authCoachRoutes);
appRoutes.use(dataCoachRoutes);

export default appRoutes;
