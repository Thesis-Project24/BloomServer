import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import  Window from "../../../types";
const prisma = new PrismaClient()



const addWindow =async(req:Request,res:Response)=> {
    try {
            await prisma.window.createMany({
            data: req.body
        })
        const windows = await prisma.window.findMany({
        })
        console.log(windows)
        res.send(windows)
    }
    catch(error) {
        res.status(500).send(error)
    }
}

const getWindowsBydate = async(req:Request,res:Response)=>{
    let date= req.params.date
    try {
        // const windows = await prisma.window.findMany({
        //     where:{
        //         startingTime:{
        //             contains:date 
        //         }
        //     }
        // })
        // res.send(windows)
    }
    catch(error) {
        res.status(500).send(error)
    }
}



export {addWindow,getWindowsBydate}











