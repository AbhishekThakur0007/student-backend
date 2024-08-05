import express  from "express";
const studentRoute = express.Router();
import { studentCreateController ,fetchAllStudent,updateStudent, deleteStudent } from "../controllers/student";
import upload from "../middlewares/multer";
studentRoute.post("/new",upload,studentCreateController);

studentRoute.get("/all",fetchAllStudent)

studentRoute.route("/:id").delete(deleteStudent).put(upload,updateStudent)
export default studentRoute;

