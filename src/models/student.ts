import mongoose from "mongoose";

export interface IsStudent extends mongoose.Document{
  name: string;
  age: number;
  email: string;
  password: string;
  photo?: string;
  gender:string;
}

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nmae is required"],
  },
  photo: {
    type: String,
    required: [true, "Photo is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    unique: [true, "Email is Already exist"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Please fill the password"],
  },
  gender: {
    type: String,
    enum:["Male", "Female"],
    required: [true, "Please fill the password"],
  },
});


const studentModel = mongoose.model<IsStudent>("Students", studentSchema);
export default studentModel;
