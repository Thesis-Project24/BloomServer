import { PrismaClient, window } from '@prisma/client'
import { Request, Response } from 'express';
import  {Slot,Window}  from "../../../types";
const prisma = new PrismaClient()

const addSlots= async(req:Request,res:Response) => {
    try {
        let  window :Window | null =  await prisma.window.findUnique({
            where:{
                id: Number(req.params.windowId)
            }
        })
        let start = window?.startingTime.valueOf()
        let end = window?.endingTime.valueOf()
        let windowDuration = (end - start) / 60000
        let slots : any[] = []
        let x = window?.duration || 61
        let y = window?.pause || 16
        // console.log(end,  'end');
        // console.log(start,  'start');
        // console.log(windowDuration)
        
        while (start < end) {
            console.log(x);
            console.log(windowDuration, "duration");
            let slot={
                windowId:window?.id,
                startingTime:new Date(start),
                endingTime:new Date (start + (x* 60000)),
            }
            if(window?.duration){       
                windowDuration = windowDuration- x + y
                start = start + ((x + y)*60000)
                
                // console.log(windowDuration,"test1")
                
            }
            // console.log(x,y);

            // console.log(start);
            
            slots.push(slot)
        }
            await prisma.slot.createMany({data:slots})
            res.send(slots)

    }
    catch(error){
        res.send(error)
    }
}




export {addSlots} 