import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import  Window from "../../../types";
const prisma = new PrismaClient()



const addWindow =async(req:Request,res:Response)=> {
    console.log("triggered");
    
    try {
            await prisma.window.createMany({
            data: req.body,
               
            
        })
        const windows = await prisma.window.findMany({
            where:{
                doctorId:Number(req.params.doctorId)
            }
        })
        console.log(windows)
        res.json(windows)
    }
    catch(error) {
        res.status(500).send(error)
    }
}


//get the windows of a specific day (date)
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
        res.status(500).send(error)
    }
}



export {addWindow,getWindowsBydate}











