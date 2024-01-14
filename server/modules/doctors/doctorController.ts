import { PrismaClient } from "@prisma/client";
import { Doctor, Appointmenent } from "../../types";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doc = await prisma.doctor.findMany();
    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getOneDoc = async (req: Request, res: Response) => {
  const productId = JSON.parse(req.params.id);
  try {
    const doc = await prisma.doctor.findUnique({
      where: {
        id: productId,
      },
    });
    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const addDoctor = async (req: Request, res: Response) => {
  const {
    email,
    first_name,
    last_name,
    phone_number,
    specialty,
    profile_picture,
    address,
    bio,
  }: Doctor = req.body;
  try {
    const docBody: Doctor = {
      email,
      first_name,
      last_name,
      phone_number,
      specialty,
      profile_picture,
      address,
      bio,
    };
    const doc = await prisma.doctor.create({
      data: docBody,
    });

<<<<<<< HEAD
    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const upDateDoc = async (req: Request, res: Response) => {
  const {
    id,
    email,
    first_name,
    last_name,
    phone_number,
    specialty,
    profile_picture,
    address,
    bio,
  }: Doctor = req.body;
=======
    export const getOneDoc = async (req:Request,res:Response)=>{
        const id = JSON.parse(req.params.id);;
        try {

            const doc = await prisma.doctor.findUnique({
                where: {
                  id: id,
                },
              })
            return res.json(doc)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
        }
>>>>>>> 7e05dae9b5dad3762453f2769a1e458380535b09

  try {
    const docBody: Doctor = {
      email,
      first_name,
      last_name,
      phone_number,
      specialty,
      profile_picture,
      address,
      bio,
    };
    const doc = await prisma.doctor.update({
      where: { id },
      data: docBody,
    });

    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

<<<<<<< HEAD
export const addReviewDoc = async (req: Request, res: Response) => {
  try {
    const Appoint = await prisma.appointment.findMany({
      where: {
        doctorId: Number(req.params.docotrId),
        appReview: {
          gte: 0,
        },
      },
    });
    const doctorReview = Appoint.reduce((review: number, app) => {
      return (review = review + app.appReview);
    }, 0);
    const doctor = prisma.doctor.update({
      where: {
        id: Number(req.params.docotrId),
      },
      data: {
        review: {
          set: doctorReview / Appoint.length,
        },
      },
    });
    res.send(doctor);
  } catch (error) {}
};
=======





export const addDoctor = async (req:Request,res:Response)=>{
    const {email,first_name,last_name,phone_number,specialty,profile_picture,address , bio}:Doctor = req.body
    try {
       
        const docBody : Doctor = {
            email,
            first_name,
            last_name,
            phone_number,
            specialty,
            profile_picture,
            address,
            bio
        }
        const doc = await prisma.doctor.create({
            data: docBody
        })
        
        return res.json(doc)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
        
    }
    }

    
export const upDateDoc = async (req:Request,res:Response)=>{
    const {id ,email,first_name,last_name,phone_number,specialty,profile_picture,address , bio}:Doctor = req.body
   
    try {
       
        const docBody : Doctor = {
            email,
            first_name,
            last_name,
            phone_number,
            specialty,
            profile_picture,
            address,
            bio
        }
        const doc = await prisma.doctor.update({
            where: { id },
            data: docBody
        })
        
        return res.json(doc)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
        
        
    }
    }

    export const addReviewDoc= async(req:Request,res:Response)=>{
        try {
            const Appoint =await  prisma.appointment.findMany({
                where:{
                    doctorId:Number(req.params.docotrId),
                    appReview: {
                        gte:0
                    }
                }
            })
            const doctorReview= Appoint.reduce((review:number,app)=>{
                return review=review + app.appReview
        
            },0)
            const doctor = prisma.doctor.update({
                where:{
                    id:Number(req.params.docotrId)
                },
                data:{
                    review:{
                        set:doctorReview/ Appoint.length
                    }
                }
            })
            res.send(doctor)
        }
        catch(error){
        }
    }
 
    export const getDocSpecialist = async (req:Request,res:Response)=>{
        const {specialty} = req.params
        try {

            const doc = await prisma.doctor.findMany({
                where: {
                 specialty: specialty,
                },
              })
            return res.json(doc)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
        }

        export const getDocGender = async (req:Request,res:Response)=>{
            const {gender} = req.params
            try {
    
                const doc = await prisma.doctor.findMany({
                    where: {
                        gender: gender,
                    },
                  })
                return res.json(doc)
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
            }
>>>>>>> 7e05dae9b5dad3762453f2769a1e458380535b09
