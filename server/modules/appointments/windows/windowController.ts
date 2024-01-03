import { PrismaClient, window } from '@prisma/client'
import { Request, Response } from 'express';
import  Window from "../../../types";
const prisma = new PrismaClient()
import moment from 'moment';

moment().format();

const addWindow =async(req:Request,res:Response)=> {
    const {window} = req.body
   
    try {
        const windows =  await prisma.window.createMany({
            data: req.body
        })
        res.send(windows)
    }
    catch(error) {
        res.status(500).send(error)
    }

}

export {addWindow}