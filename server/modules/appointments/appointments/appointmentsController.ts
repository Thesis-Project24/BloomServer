import { PrismaClient } from "@prisma/client";
import { Appointmenent } from "../../../types";
import { Request, Response } from "express";

interface UpDateAppointmenent {
    id?: number;
    patientId?: number;
    doctorId?: number;
    appDetails?: string;
    appStatus?: string;
    appReview?: number;
    appFeedback?: string;
    slotId?: number;
  }

const prisma=new PrismaClient();

export const addAppointmenent= async (req:Request,res:Response)=>{
    const {patientId,doctorId,slotId,appDetails,appStatus,appReview,appFeedback}:Appointmenent = req.body
    if (!patientId) {
        return res.status(400).send('Patient ID is required');
      }
    try {
       
        const appBody : Appointmenent = {
            patientId,
            doctorId,
            slotId,
            appDetails,
            appStatus,
            appReview,
            appFeedback
        }
        const app = await prisma.appointment.create({
            data: appBody
        })
        
        return res.json(app)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
        
    }
    }


    
export const updateAppFeedbackReview= async (req:Request,res:Response)=>{
    const {id,appStatus,appReview,appFeedback}:UpDateAppointmenent = req.body
    try {
       
        const appBody : UpDateAppointmenent = {
            id,
            appStatus,
            appReview,
            appFeedback
        }
        const app = await prisma.appointment.update({
            where: { id },
            data: appBody
        })
        
        return res.json(app)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
        
    }
    }

        
export const updateAppStatus= async (req:Request,res:Response)=>{
    const {id,appStatus}:UpDateAppointmenent = req.body
    try {
       
        const appBody : UpDateAppointmenent = {
            id,
            appStatus,
        }
        const app = await prisma.appointment.update({
            where: { id },
            data: appBody
        })
        
        return res.json(app)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
        
    }
    }
