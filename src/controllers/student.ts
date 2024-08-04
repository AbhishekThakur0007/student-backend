
import express from "express"
import { Request, Response } from "express";
import studentModel from "../models/student";
import mongoose from "mongoose";
import sendVerificationEmail from "../utils/mailer";
import bcrypt from "bcrypt";
export const studentController = async (req: Request, res: Response) => {
   const { id, name, photo, age, email, password } = req.body

  
   // gen hash for password 
   const saltRounds = 10;
 const salt = await bcrypt.genSalt(saltRounds);
 const hash =await  bcrypt.hash(password,salt)
   //student create 
   try {
      const student = await studentModel.create({
         id, name, age, email, password:hash
      })

      //send email for user to verify the email

      await sendVerificationEmail(student.email ,hash );

     

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