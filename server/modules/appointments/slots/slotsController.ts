import { PrismaClient, window } from '@prisma/client'
import { Request, Response } from 'express';
import  {Slot,Window}  from "../../../types";
const prisma = new PrismaClient()


//add slots using (window info: consultation duration,pause, )
const addSlots= async(req:Request,res:Response) => {
    try {
        //get window by id
        let  window :Window | null =  await prisma.window.findUnique({
            where:{
                id: Number(req.params.windowId)
            }
        })
        //transform starting and ending time to ms
        let start = window?.startingTime.valueOf()
        let end = window?.endingTime.valueOf()
        //calculate window duration in minutes
        let windowDuration = (end - start) / 60000

        let slots : any[] = []

        //asign consultation duration and pause to x and y  or maximum values in minutes
        let x = window?.duration || 61
        let y = window?.pause || 16

        //create slots
        while (start < end) {
            //each slot has the window id starting time and ending time (type dateTime)
            let slot={
                windowId:window?.id,
                startingTime:new Date(start),
                endingTime:new Date (start + (x* 60000)),
            }
            //reasign window duration and start until we reach the end
            if(window?.duration){       
                windowDuration = windowDuration- x + y
                start = start + ((x + y)*60000) 
            }  
            slots.push(slot)
        }
            //add slots to the database
            await prisma.slot.createMany({data:slots})
            res.send(slots)

    }
    catch(error){
        res.send(error)
    }
}

// get all slots of a specific window
const getSlots =async (req:Request,res:Response)=> {
    try {
    const slots:Slot[]= await prisma.slot.findMany({
        where:{
            windowId:Number(req.params.windowId)
        }
    })
    res.send(slots)
    }
    catch (error) {
    res.send(error)
    }
}

//get a specific Slot
const getSlot=async (req:Request,res:Response)=> {
    try {
        const slot:Slot|null = await prisma.slot.findUnique({
            where:{
                id:Number(req.params.slotId)
            }
        })
        res.send(slot)
    }
    catch(error) {
        res.send(error)
    }
}




export {addSlots,getSlots,getSlot} 