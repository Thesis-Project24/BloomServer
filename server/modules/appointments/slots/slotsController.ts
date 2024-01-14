import { PrismaClient, window } from "@prisma/client";
import { Request, Response } from "express";
import { Slot, User, Window } from "../../../types";
const prisma = new PrismaClient();

const addSlots = (window: Window) => {
    //transform starting and ending time to ms
    let start = new Date(window.startingTime).valueOf();
    let end = new Date(window.endingTime).valueOf();
    //calculate window duration in minutes
    let windowDuration = (end - start) / 60000;

    let slots: any[] = [];
    //asign consultation duration and pause to x and y  or maximum values in minutes
    let x = window.duration || 61;
    let y = window.pause || 16;

    //create slots
    while (start < end) {
        //each slot has the window id starting time and ending time (type dateTime)
        let slot = {
            windowId: window.id,
            startingTime: new Date(start),
            endingTime: new Date(start + x * 60000),
        };
        //reasign window duration and start until we reach the end
        if (window.duration) {
            windowDuration = windowDuration - x + y;
            start = start + (x + y) * 60000;
        }
        console.log(slots);
        slots.push(slot);
    }
    return slots;
};

// get all slots of a specific window
const getSlots = async (req: Request, res: Response) => {
    try {
        const slots: Slot[] = await prisma.slot.findMany({
            where: {
                windowId: Number(req.params.windowId),
            },
        });
        res.send(slots);
    } catch (error) {
        res.send(error);
    }
};

//get a specific Slot
const getSlot = async (req: Request, res: Response) => {
    try {
        const slot: Slot | null = await prisma.slot.findUnique({
            where: {
                id: Number(req.params.slotId),
            },
        });
        res.send(slot);
    } catch (error) {
        res.send(error);
    }
};

//add a user to the waitlist while the slot is pending
const addWaitlist = async (req: Request, res: Response) => {
    let user = req.body;
    try {
        await prisma.slot.update({
            where: {
                id: Number(req.params.slotId),
            },
            data: {
                waitlist: {
                    connect: req.body,
                },
            },
        });
    } catch (error) {}
};

export { addSlots, getSlots, getSlot, addWaitlist };
