import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Window, Slot } from "../../../types";
import { addSlots, getSlot, getSlots } from "../slots/slotsController";
const prisma = new PrismaClient();

//////////////////////create window with slots/////////////////////////////////////
const addWindow = async (req: Request, res: Response) => {
    try {
        //create windows
        const windows = req.body;
        //create and return windows
        const windowsDb = await prisma.$transaction(
            windows.map((window: Window) =>
                prisma.window.create({ data: window })
            )
        );
        //create slots for every window
        const slots = windowsDb.map((window) => {
            return addSlots(window);
        });
        //insert created slots in database
        const slotsF = slots.flat();
        const response = await prisma.slot.createMany({ data: slotsF });
        //send the slots as a response(array of arrays)
        res.json(slotsF);
    } catch (error) {
        res.status(500).send(error);
    }
};

//////////////////////get the windows of a specific day and doctor (date) ///////////////////////
const getWindowsBydate = async (req: Request, res: Response) => {
    let date = req.params.date;
    try {
        const windows = await prisma.window.findMany({
            where: {
                startingTime: {
                    contains: date,
                },
                doctorId: Number(req.params.doctor),
            },
        });
        res.json(windows);
    } catch (error) {
        console.log(error);

        res.send(error);
    }
};

const createSchedule = async (req: Request, res: Response) => {
    // const windows= req.body
    console.log("window");
    try {
        const windows = [
            {
                doctorId: 1,
                duration: 15,
                pause: 5,
                startingTime: "2025-01-20T08:00:00.000Z",
                endingTime: "2025-01-20T08:40:00.000Z",
            },
        ];

        const windowsDB = await prisma.$transaction(
            windows.map((window: Window) =>
                prisma.window.create({ data: window })
            )
        );

        const schedule = await prisma.scheduledwindow.createMany({
            data: windows,
        });
        const scheduleSlots = [];
        for (let i = 0; i < windowsDB.length; i++) {
            const element = windowsDB[i];
            scheduleSlots.push(addSlots(element));
        }
        const flat = scheduleSlots.flat();
        await prisma.slot.createMany({ data: flat });
        res.send(flat);
    } catch (error) {
        console.log(error);
        
        res.send(error);
    }
};

const addOneWeek = async (req: Request, res: Response) => {
    try {
        const schedule = await prisma.scheduledwindow.findMany({
            where: { doctorId: Number(req.params.doctorId) },
        });
        const updatedSchedule = schedule.map((window: Window) => {
            delete window.id
            const start = new Date(window.startingTime);
            const end = new Date(window.endingTime);
            // increment the date
            start.setDate(start.getDate() + 7);
            end.setDate(end.getDate() + 7);
            // reassign the new date
            window.startingTime = start.toISOString();
            window.endingTime = end.toISOString();
            return window;
        });
        await prisma.scheduledwindow.deleteMany({
            where: {
                doctorId: Number(req.params.doctorId)
            }
        })
        await prisma.window.createMany({
            data: updatedSchedule
        })
        await prisma.scheduledwindow.createMany({
            data: updatedSchedule
        })
        const newWindows = prisma.window.createMany({
            data: updatedSchedule
        }) 
        res.send(updatedSchedule);
      }
         catch (error) {
        res.send(error);
    }
};

export { addWindow, getWindowsBydate, createSchedule, addOneWeek };
