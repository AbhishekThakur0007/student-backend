import express  from "express";
const studentRoute = express.Router();
import { studentController } from "../controllers/student";
import upload from "../middlewares/multer";
studentRoute.post("/new",upload,studentController);
export default studentRoute;

