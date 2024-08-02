
import express  from "express"
import { Request , Response } from "express"

export const studentController = (req:Request,res:Response)=> {
   res.json({"name":"abhishek"})

}