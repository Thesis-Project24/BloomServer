import { PrismaClient } from "@prisma/client";
import { Doctor, Appointmenent } from "../../types";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/////////////////////////////get all doctors/////////////////////////////////////
export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doc = await prisma.doctor.findMany();
    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


////////////////////get one doctor by id///////////////////////////////////////
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


////////////////////////////////add doctor (admin)/////////////////////////////////////
export const addDoctor = async (req: Request, res: Response) => {
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
  try {
    const docBody=  {
      id,
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
    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

////////////////////////update doctor info//////////////////////////////////////
export const upDateDoc = async (req: Request, res: Response) => {
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
    const docBody = {
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
      where: { id:req.params.id },
      data: docBody,
    });

    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


/////////////////////////////review doctor by appointements review//////////////////////:
export const addReviewDoc = async (req: Request, res: Response) => {
  try {
    const Appoint = await prisma.appointment.findMany({
      where: {
        doctorId: req.params.docotrId,
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
        id: req.params.docotrId,
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

//////////////////////////////get doctors by specialties////////////////////////:
export const getDocSpecialists = async (req: Request, res: Response) => {
  const { specialty } = req.params;
  try {
    const doc = await prisma.doctor.findMany({
      where: {
        specialty: specialty,
      },
    });
    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};


////////////////////////////////Get doctors by gender///////////////////////////////////
export const getDocGender = async (req: Request, res: Response) => {
  const { gender } = req.params;
  try {
    const doc = await prisma.doctor.findMany({
      where: {
        gender: gender,
      },
    });
    return res.json(doc);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
