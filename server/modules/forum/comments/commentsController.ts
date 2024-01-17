import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const addComment = async (req: Request, res: Response) => {
    try {
        const comment = await prisma.comment.create({ data: req.body });
        res.send(comment);
    } catch (error) {
        res.send(error);
    }
};

const getCommentsByPost = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { id: Number(req.params.id) },
        });
        res.send(comments);
    } catch (error) {
        res.send(error);
    }
};

const getCommentsByTaggedUser = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { id: Number(req.params.postId),
            tagId: Number(req.params.tagId)},
        });
        res.send(comments);
    } catch (error) {
        res.send(error);
    }
};

const deleteComment = async (req:Request, res:Response) => {
    try {
        await prisma.comment.delete({where:{id:Number(req.params.id)}})
        res.send("deleted")
    }
    catch (error) {
        res.send(error);
    }
}

export { addComment, getCommentsByPost,getCommentsByTaggedUser,deleteComment };
