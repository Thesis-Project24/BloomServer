import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import  Window from "../../../types";
const prisma = new PrismaClient()



const addWindow =async(req:Request,res:Response)=> {
    try {
        // console.log("hellooooooooo")    
        console.log(req.body, "request body")
            const windows =  await prisma.window.createMany({
            data: req.body
        })
    
        res.send(windows)
    }
    catch(error) {
        console.log(error);
        
        res.status(500).send(error)
    }
}



export {addWindow}











