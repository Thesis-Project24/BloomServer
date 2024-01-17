import { PrismaClient } from "@prisma/client";
import { Appointmenent } from "../../../types";
import { Request, Response } from "express";

const prisma=new PrismaClient();

const addFlair = async (req:Request,res:Response)=> {
    try {
        const flair = await prisma.flair.create({data:req.body})
        res.send(flair)
    }
    catch (error){
        res.send(error)
    }
    }

    export {addFlair}