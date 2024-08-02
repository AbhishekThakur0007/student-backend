import express  from "express";
const studentRoute = express.Router();
import { studentController } from "../controllers/student";

studentRoute.post("/new",studentController);
export default studentRoute;

