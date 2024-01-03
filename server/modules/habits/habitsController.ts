import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Habit ,TrackHabit,User} from "../../types";


const prisma = new PrismaClient();


export const creatHabit =async (req:Request,res:Response) => {
    try {
        const {name} : Habit = req.body
        const habit = await prisma.habit.create({
            data : {
                name,
            },
        })
        return res.status(201).json({habit})
    }catch (error){
        console.error(error)
        return res.status(500).json({error:"Internal Server Error :("})
    }
}


// export const assignHabit =async (req:Request,res:Response) => {
//     try{
//         const {habitId} = req.params
//         const userId = 
//     }
// }