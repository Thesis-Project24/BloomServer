import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import  {Window,Slot} from "../../../types";
import { addSlots } from '../slots/slotsController';
const prisma = new PrismaClient()


//////////////////////create window with slots/////////////////////////////////////
const addWindow =async(req:Request,res:Response)=> {
    try {
        //create windows 
            await prisma.window.createMany({
            data: req.body,
        })
        //get windows of a specific doctor
        const windows = await prisma.window.findMany({
            where:{
                doctorId:Number(req.params.doctorId)
            }
        })
        //create slots for every window
        const slots = windows.map(window=>{
               return addSlots(window)
        })
        //insert created slots in database
        const slotsF = (slots.flat())
        const response = await  prisma.slot.createMany({data:slotsF}) 
        //send the slots as a response(array of arrays)
        console.log(response)
        res.json(slotsF)
    }
    catch(error) {
        res.status(500).send(error)
    }
}


//////////////////////get the windows of a specific day (date) ///////////////////////
const getWindowsBydate = async(req:Request,res:Response)=>{
    let date= req.params.date
    try {
        const windows = await prisma.window.findMany({
            where:{
                startingTime:{
                    contains:date
                }
            }
        })
        res.json(windows)
    }
    catch(error) {
        console.log(error);
        
        res.send(error)
    }
}



export {addWindow,getWindowsBydate}











