import express  from "express";
import Dbconnection from "./utils/mongo";
import studentRoute from "./routes/student";
const app = express();
const port = 9999;
Dbconnection();
app.use(express.json())

app.listen(port,()=>{
    console.log(`app is working in http//:localhost:${port}`)
})

app.use("/student",studentRoute);


