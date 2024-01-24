import { PrismaClient } from "@prisma/client";
import { User } from "../../types";
import { Request, Response } from "express";
const prisma=new PrismaClient();


////////////////////////add user to the database////////////////////////////////////
const signUp = async (req:Request,res:Response)=>{
try {
    const {email,username,phone_number,fullName}:User = req.body
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if (user!==null) {
        const user = await prisma.user.findUnique({
            where:{email:req.body.email},
        })
        return res.send(user);
        
    }
    const users =await prisma.user.create({
        data:{
           email,
           username,
           fullName ,
        }
        
    })
    return res.status(201).send(users)
} catch (error) {
    console.log(error);
    res.status(500).send(error)
    
    
}
}

//////////////////////////////check if user is in database when they log in////////////////
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


////////////////////////////////////delete user//////////////////////////////////////
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


///////////////////////////////update user info///////////////////////////////////////
const updateInfo = async(req:Request,res:Response)=>{
try {
   const response= await prisma.user.update({
        where:{
            id:Number(req.params.userId)
        },
        data:{
            age:{
                set:req.body.age
            },
            phone_number:{
                set:req.body.phone_number
            },
            profile_picture:{
                set:req.body.profile_picture
            },
            fullName:{
                set:req.body.fullName
            }
        }
    })
    res.send(response)
}
catch(error) {
    res.send(error)
}
}


///////////////////////////////////////////get one user by id//////////////////////////////
const getOne = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.userId),
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const getallusers = async (req:Request, res:Response) => {
    try {
       
        const users = await prisma.user.findMany();
        return res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
const getOneUserByUserName= async (req:Request, res:Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.params.username,
            },
            select: {
                id: true, // Only return the user ID
            },
        });

        if (user) {
            res.json(user.id);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error:any) {
        console.error('Error fetching user ID:', error);
        res.status(500).send(error.message);
    }
}


export { signUp, signIn, deleteAccount, updateInfo, getOne,getallusers,getOneUserByUserName };