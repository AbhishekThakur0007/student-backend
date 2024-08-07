import express  from "express";
import Dbconnection from "./utils/mongo";
import studentRoute from "./routes/student";
import cors from "cors";
const app = express();
const port = 9998;
Dbconnection();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


app.listen(port,()=>{
    console.log(`app is working in http://localhost:${port}`)
})
// app.use("/",(req,res)=>{
//     res.send("App is working")
// })
app.use("/student",studentRoute);


