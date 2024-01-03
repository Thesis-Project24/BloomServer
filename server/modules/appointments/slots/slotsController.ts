import { PrismaClient, window } from '@prisma/client'
import { Request, Response } from 'express';
import  {Slot,Window}  from "../../../types";
const prisma = new PrismaClient()

const addSlots= async(req:Request,res:Response) => {
    try {
        const window:window= prisma.window.findUnique({
            where:{
                id: Number(req.params.windowId)
            }
        })
        let startM= window.startingTime.getMinutes()
        let startH= window.startingTime.getHours()
        let start= startM + (startH * 60)
        let endM= window.startingTime.getMinutes()
        let endH= window.startingTime.getHours()
        let end= endM + (endH * 60)
        let windowDuration = end - start
        let slots = []
        while (windowDuration !== 0) {
            let slot={
                windowId:window.id,
            }
        }

    }
    catch(error){
        res.send(error)
    }
}




export {addSlots} 