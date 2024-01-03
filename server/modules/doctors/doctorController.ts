import { PrismaClient } from "@prisma/client";
import { Doctor } from "../../types";
import { Request, Response } from "express";

const prisma=new PrismaClient();



export const addDoctor = async (req:Request,res:Response)=>{
    const {email,first_name,last_name,phone_number,specialty,profile_picture,address}:Doctor = req.body

    try {
       
        const docBody : Doctor = {
            email,
            first_name,
            last_name,
            phone_number,
            specialty,
            profile_picture,
            address
        }
        const doc = await prisma.doctor.create({
            data: docBody
        })
        
        return res.json(doc)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
        
    }
    }