import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// const addComment = async (req:Request, res:Response) => {
//     console.log('Request to add comment:', req.body);
//     try {
//       const comment = await prisma.comment.create({ data: req.body });
//       res.send(comment);
//     } catch (error:any) {
//       console.error('Error creating comment:', error);
//       res.status(500).send(error.message);
//     }
//   };

const addComment = async (req: Request, res: Response) => {
    console.log('Request to add comment:', req.body);
    const { content, postId, userId, tagId } = req.body; // Added tagId
    try {
        const comment = await prisma.comment.create({
            data: { content, postId, userId, tagId }, // Include tagId in the data
        });
        res.send(comment);
    } catch (error: any) {
        console.error('Error creating comment:', error);
        res.status(500).send(error.message);
    }
};

const getCommentsByPost = async (req: Request, res: Response) => {
    try {
        const comments = await prisma.comment.findMany({
            where: { postId: Number(req.params.id) },
            include: {
                User: {
                    select: {
                        fullName: true,
                        profile_picture: true,
                        comments:true
                    },
                },
            },
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
//get tagged people by comment Id 


const deleteComment = async (req:Request, res:Response) => {
    try {
        await prisma.comment.delete({where:{id:Number(req.params.id)}})
        res.send("deleted")
    }
    catch (error) {
        res.send(error);
    }
}
const editComment = async (req:Request, res:Response) => {
    try {
        const comment = await prisma.comment.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.send(comment);
    }
    catch(error){
        res.send(error);
    }
  }
  
  const editTagcomment=async (req:Request, res:Response) => {
    const {userId}=req.body
try {
    const comment = await prisma.comment.update({
        where:{id: Number(req.params.id)},
        data: { tagId: userId },
    })
    res.send(comment)
} catch (error) {
    res.send(error)
}

  }


export { addComment, getCommentsByPost,getCommentsByTaggedUser,deleteComment,editComment,editTagcomment };
