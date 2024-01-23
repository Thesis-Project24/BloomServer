import { PrismaClient } from "@prisma/client";
import { Request, Response, response } from "express";
const prisma=new PrismaClient();


export const getAllPosts = async (req: Request, res: Response) => {
    const { authorId } = req.params;
    
    try {
        const allPosts = await prisma.journal.findMany({
            where: { authorId: authorId }
        })
        res.status(200).json(allPosts);
    } catch (err) {
        console.error("Error Get", err);
        res.status(500).send("Internal Server Error");
    }
}


export const getOnePost = async (req: Request, res: Response) => {
const {id} = req.params;
const {authorId} = req.params;
try {
    const getOne=await prisma.journal.findUnique({
        where:{id: Number(id),
            authorId: authorId
        }
    })
    res.status(200).json(getOne);
} catch (error) {
    console.log(error);
            res.status(500).send(error);
        }
}

export const removePost=async(req:Request, res: Response) => {
    const { authorId } = req.params;
    try {
        const query = await prisma.journal.delete({where:{id:parseInt(req.params.id),
        authorId:authorId}})
    res.send(query);
    } catch (error) {
        res.send(error)
    }
}

export const addPost=async(req:Request, res: Response) => {
    const {content,title}=req.body
    const { authorId } = req.params;
try {
    const post =await prisma.journal.create({
        data:{
            content,
            title,
            authorId:authorId

        }
    })
    res.status(200).json(post)

} catch (error:any) {
    res.status(400).json({msg:error.message})
}
}

export const updatePost = async (req: Request, res: Response) => {
    const { content, title } = req.body;
    const { id } = req.params;
    const {authorId}=req.params;
    try {
        const change = await prisma.journal.update({
            where: {
                id: Number(id),
                authorId:authorId
            },
            data: { content, title },
        });
        res.status(200).json(change);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
