import { Flair, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma=new PrismaClient();

/////////////////////////////////////get all flairs(admin)////////////////////////////
const getFlairs= async (req:Request,res:Response)=> {
    try {
        const flairs:Flair[] = await prisma.flair.findMany({})
    res.send(flairs)}
    catch(error) {
        res.send(error)
    }
}

/////////////////////////////////////add flair to the app(admin)///////////////////////
const addFlair = async (req:Request,res:Response)=> {
    try {
        const flair:Flair = await prisma.flair.create({data:req.body})
        res.send(flair)
    }
    catch (error){
        res.send(error)
    }
    }
    
/////////////////////////////////////delete flairs from the app(admin)///////////////////////
   const  deleteFlair = async (req:Request, res:Response)=> {
        try {
            await prisma.flair.delete({
                where:{id: Number(req.params.id)}
            })
            res.send("deleted")
        }
        catch(error){
            res.send(error)
        }
    }

    export {addFlair,deleteFlair,getFlairs}