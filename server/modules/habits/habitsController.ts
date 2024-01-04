import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Habit, TrackHabit, User } from "../../types";

const prisma = new PrismaClient();

// {   Habit Creation  } //

export const creatHabit = async (req: Request, res: Response) => {
  try {
    const { name }: Habit = req.body;
    const habit= await prisma.habit.create({
      data: {
        name,
      },
    });
    return res.status(201).json({ habit });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error :(" });
  }
};
// {   Habit Assignement  } //
export const assignHabit = async (req: Request, res: Response) => {
  try {
    const { habitId, userId }: TrackHabit = req.body;
    //    check if the habit exists
    const habit = await prisma.habit.findUnique({
      where: {
        id: habitId,
      },
    });
    if (!habit) {
      return res.status(404).json({ error: "habit not found " });
    }
    // check if the user id exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found :(" });
    }
    // Check if the habit is already assigned to the user
    const existingTrackHabit = await prisma.trackHabit.findFirst({
      where: {
        habitId: habit.id,
        userId: user.id,
      },
    });
    if (existingTrackHabit) {
      return res.status(400).json({ error: "Habit already assigned to user" });
    }
    // const initTracker = Array.from({ length: 30 }, () => 0);
    const trackHabit = await prisma.trackHabit.create({
      data: {
        habitId: habit.id,
        userId: user.id,
        tracker: [],
      },
    });
    return res.status(201).json({ trackHabit });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server err ouch" });
  }
};

// {get all habits from specefic user} //

export const getAllHabitsFromUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userHabits = await prisma.trackHabit.findMany({
      where: {
        userId: user.id,
      },
      include: {
        habit: true,
      },
    });
    return res.status(200).json({ userHabits });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error :(" });
  }
};

//  {helper to get the day of the week}
function getDayOfWeek(date: Date): string {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}
// {tracker function }
export const postSatisfaction =async (req:Request,res:Response) => {
  try {
      const {habitId,userId,rating} = req.body
      // check if the habit is assigned to the user first 
      const trackHabit = await prisma.trackHabit.findFirst({
          where : {
              habitId,
              userId
          }
      })
      if(!trackHabit){
          return res.status(404).json({error : 'Habit not assigned'})
      }
      const currentDate = new Date ()
      const dayOfWeek= getDayOfWeek(currentDate)
      const existingTracker = trackHabit.tracker
      const updatedTracker = [...existingTracker,{dayOfWeek,rating}]
      await prisma.trackHabit.update({
          where : {
              id:trackHabit.id,
          },
          data : {
              tracker: updatedTracker
          }as any
      })
      return res.status(200).json({success:'rating Submitted'})
  }catch (error){
      console.error(error);
      return res.status(500).json({error: 'Internal server err'})
  }
}
