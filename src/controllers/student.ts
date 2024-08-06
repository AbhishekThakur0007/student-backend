
import express from "express"
import { Request, Response } from "express";
import studentModel from "../models/student";
import mongoose from "mongoose";
import sendVerificationEmail from "../utils/mailer";
import { baseQueryType } from "../types/type";
import { rm } from "fs";

import bcrypt from "bcrypt";

//******************student create route

export const studentCreateController = async (req: Request, res: Response) => {
   const { name, age, email, password } = req.body
   const photo = req.file;
console.log({  name, age, email, password });
console
   
   // gen hash for password 
//    const saltRounds = 10;
//  const salt = await bcrypt.genSalt(saltRounds);
//  const hash =await  bcrypt.hash(password,salt)
   //student create 
   const emailVerificationToke = "123456789";
   try {
     
      const student = await studentModel.create({
         name, photo:photo?.path, age, email, password
      })

      //send email for user to verify the email

      await sendVerificationEmail(student.email ,emailVerificationToke );

     

      res.status(200).json({ msg: student.name })
   } catch (error) {
      //validation error handling
      if (error instanceof mongoose.Error.ValidationError) {
         const errors = Object.values(error.errors).map(err => {
            return err
         })
         res.send(errors);

      }

   }
}


//*****************fetch all student

export const fetchAllStudent =async (req:Request,res:Response)=>{

const {  age ,gender } = req.query;

const search =  req.query.search as string;
   
const baseQuery: baseQueryType = {}

try{
   if (search){
      baseQuery.name = {
         $regex:search,
         $options:'i'
      }
   }

}catch(error ){

}

   const students = await studentModel.find();
   console.log(students)
   res.send(students);

}


// ******************* update student 

export const updateStudent =async (req:Request,res:Response)=>{
       const {id} = req.params;
       console.log(id)
       const {name, age, email, password } = req.body;
       const photo = req.file;

       console.log ({name, age, email, password });

     const students = await studentModel.findById(id)

   
     console.log(students);
     if(!students){

       return res.status(400).send({msg:"student not found"})
     }
     if(photo){
      rm(students.photo!,()=>{
        console.log("photo has been deleted");
      });
      students.photo = photo.path;
     }

        if (name ){ students.name = name;}
        if (age) students.age = age;
        if (email) students.email = email;
        if (password) students.password = password;
        if (photo) students.photo = photo?.path;

       await students.save();
       return res.status(200).json({
         sucess:true,
         message:`${students.name} is updated`
       })
}


export const deleteStudent =async (req:Request , res:Response)=>{
   const {id} = req.params;
const student  =await  studentModel.findById(id);
console.log(student)
if(!student){
  return  res.status(400).json({
      success:false,
      message:"Student not found"

   })
  
}
if(student.photo){
   rm(student.photo,()=>{
      console.log("Photo has been deleted")
   })
}
await student.deleteOne();
return res.status(200).json({
   success:true,
   message:"Deleted"
})
}