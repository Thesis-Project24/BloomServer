import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();


const addMedication = async (req:Request,res:Response)=> {
    try {
        const medication = await prisma.meds.create({data:req.body})
        res.send(medication)
    }
    catch(error) {
        res.send(error)
    }
}

const scheduleMedication = async (req:Request,res:Response)=> {
    try {
        const scheduleMed = prisma.medSchedule.create({data:req.body})
        res.send(scheduleMed)
    }
    catch(error) {
        res.send(error)
    }
}

export {addMedication,scheduleMedication}