import { PrismaClient } from "@prisma/client";
import { User } from "../../types";
import { Request, Response } from "express";
const prisma=new PrismaClient();



const signUp = async (req: Request, res: Response) => {
    try {
      const { email, first_name, last_name, username, phone_number }: User = req.body;
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
  
      if (existingUser !== null) {
        return res.send(existingUser);
      }
  
      const newUser = await prisma.user.create({
        data: req.body
      });
  
      return res.status(201).send(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error"});
    }
  };
  
const signIn = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email }
        });
        
        if (!user) {
            res.status(409).send("User does not exist");
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res.send(error);
    }
};

const deleteAccount=async(req:Request,res:Response)=>{
    try {
        const id=Number(req.params.id)
        const user =await prisma.user.delete({
            where:{id:id}
        })
        res.send("deleted")
    } catch (error) {
        res.send(error)
    }
}


export {signUp,signIn,deleteAccount}