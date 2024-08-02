import mongoose from "mongoose";

const Dbconnection = ()=>{
    mongoose.connect("mongodb://localhost:27017",{dbName:"Student db"});
    console.log("DB connected");
}
export default Dbconnection;