import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "id is required"],
  },
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
});

const studentModel = mongoose.model("Students", studentSchema);
export default studentModel;
