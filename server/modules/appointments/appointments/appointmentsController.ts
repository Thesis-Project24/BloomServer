import { PrismaClient } from "@prisma/client";
import { Appointmenent } from "../../../types";
import { Request, Response } from "express";

const prisma=new PrismaClient();


////////////////////////add appointement status unchanged ///////////////////////////:
export const addAppointmenent= async (req:Request,res:Response)=>{
    try {
        const app = await prisma.appointment.create({
            data: req.body
        })
        return res.send(app)
    } catch (error) {
        console.log(error);
        res.send(error)
        
        
    }
    }


/////////////////////////update appointement status/review/feedback///////////////////
export const updateAppointmenent= async (req:Request,res:Response)=>{
    const {appStatus,appReview,appFeedback}:Appointmenent = req.body
    try {
        const app = await prisma.appointment.update({
            where: { id:Number(req.params.id) },
            data: {
                appStatus:{
                    set:appStatus
                },
                appReview:{
                    set:appReview
                },
                appFeedback:{
                    set:appFeedback
                }
            }
        })
        
        return res.json(app)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
        
    }
    }



