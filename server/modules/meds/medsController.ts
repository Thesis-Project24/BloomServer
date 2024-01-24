import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { MedSchedule } from "../../types";

const prisma = new PrismaClient();

const addMedication = async (req: Request, res: Response) => {
    try {
        const medication = await prisma.meds.create({ data: req.body });
        res.send(medication);
    } catch (error) {
        res.send(error);
    }
};


const scheduleMedication = async (req: Request, res: Response) => {
    // in case of complexity in the client side make sure to change the values of the schedule array to dates :)

    try {
        const scheduleMed: MedSchedule = await prisma.medSchedule.create({
            data: req.body,
        });
        res.send(scheduleMed);
    } catch (error) {
        res.send(error);
    }
};

const updateSchedule = async (req:Request,res:Response)=> {
    try {
        const med = await prisma.medSchedule.update({
            where:{id:Number(req.params.id)},
            data:{schedule:{
                set:req.body.schedule
            }}
        })
        res.send(med)
    }
    catch(error){}
}
// increment quantity in case of refill

// decrement quantity (send reminder stock minimum)
const deleteSchedule = async (req:Request,res:Response) => {
    try {
        await prisma.medSchedule.delete( {where:{id:Number(req.params.id)}})
        res.send("deleted")
    }
    catch(error){
        res.send(error)
    }
}

export { addMedication, scheduleMedication, updateSchedule,deleteSchedule };
