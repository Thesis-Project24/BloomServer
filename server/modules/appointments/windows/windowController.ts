import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Window, Slot } from "../../../types";
import { addSlots, getSlot, getSlots } from "../slots/slotsController";
const prisma = new PrismaClient();

//////////////////////create window with slots/////////////////////////////////////
const addWindow = async (req: Request, res: Response) => {
    try {
        //create windows

        // should be implemented the same way as createSchedule
        await prisma.window.createMany({
            data: req.body,
        });
        //get windows of a specific doctor
        const windows = await prisma.window.findMany({
            where: {
                doctorId: Number(req.params.doctorId),
            },
        });
        //create slots for every window
        const slots = windows.map((window) => {
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

<<<<<<< HEAD
//////////////////////get the windows of a specific day (date) ///////////////////////
const getWindowsBydate = async (req: Request, res: Response) => {
    //add doctor id
=======
//////////////////////get the windows of a specific day and doctor (date) ///////////////////////
const getWindowsBydate = async (req: Request, res: Response) => {
>>>>>>> 95ddf0b37b1be698dae5bd30aba1034dd520ed9c
    let date = req.params.date;
    try {
        const windows = await prisma.window.findMany({
            where: {
                startingTime: {
                    contains: date,
                },
<<<<<<< HEAD
=======
                doctorId: req.params.doctor,
>>>>>>> 95ddf0b37b1be698dae5bd30aba1034dd520ed9c
            },
        });
        res.json(windows);
    } catch (error) {
<<<<<<< HEAD
        console.log(error);

        res.send(error);
    }
};

const createSchedule = async (req: Request, res: Response) => {
    console.log("window");
    const window = [
        {
            doctorId: 1,
            duration: 24,
            pause: 6,
            startingTime: "2025-01-16T16:16:00.000Z",
            endingTime: "2025-01-16T17:16:22.326Z",
        },
        {
            doctorId: 1,
            duration: 24,
            pause: 6,
            startingTime: "2025-01-17T16:16:00.000Z",
            endingTime: "2025-01-17T17:16:22.326Z",
        },
        {
            doctorId: 1,
            duration: 24,
            pause: 6,
            startingTime: "2025-01-18T16:16:00.000Z",
            endingTime: "2025-01-18T17:16:22.326Z",
        },
        {
            doctorId: 1,
            duration: 24,
            pause: 6,
            startingTime: "2025-01-19T16:16:00.000Z",
            endingTime: "2025-01-19T17:16:22.326Z",
        },
    ];

    const windowsDB = await prisma.$transaction(
        window.map((w) => prisma.window.create({ data: w }))
    );

    const scheduleSlots = [];
    for (let i = 0; i < windowsDB.length; i++) {
        const element = windowsDB[i];
        scheduleSlots.push(addSlots(element));
    }
    const flat = scheduleSlots.flat();
    await prisma.slot.createMany({ data: flat });
    res.send(flat);
};

// addOneWeek

export { addWindow, getWindowsBydate, createSchedule };
=======
        console.log(error);

        res.send(error);
    }
};

const createSchedule = async (req: Request, res: Response) => {
    const windows= req.body
    
    try {
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
            where: { doctorId: req.params.doctorId },
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
                doctorId: req.params.doctorId
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
>>>>>>> 95ddf0b37b1be698dae5bd30aba1034dd520ed9c
