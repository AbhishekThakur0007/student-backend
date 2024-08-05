
import express from "express"
import { Request, Response } from "express";
import studentModel from "../models/student";
import mongoose from "mongoose";
import sendVerificationEmail from "../utils/mailer";

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

   const students = await studentModel.find();
   console.log(students)
   res.send(students);

}


// ******************* update student 

export const updateStudent =async (req:Request,res:Response)=>{
       const id = req.query;
       const {name, age, email, password } = req.body;
       const photo = req.file;

       console.log ({name, age, email, password });

     const students = await studentModel.findOne(id)
     console.log(students);
     if(!students){
       res.status(400).send({msg:"student not found"})
     }
        if (name ){ students.name = name;}
        if (age) students.age = age;
        if (email) students.email = email;
        if (password) students.password = password;
        if (photo) students.photo = photo?.path;

       console.log(students.name);
}


export const deleteStudent =async (req:Request , res:Response)=>{
   const id = req.query.id;
console.log(id)
res.send(req.query.id)
// const student = await studentModel.findById(id);
// console.log(student);
}