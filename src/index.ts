import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import appRoutes from "./routes/_index";


const app: Application = express();

dotenv.config();

console.log(process.env.SECRET_CODE);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy");
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

app.use(appRoutes);
