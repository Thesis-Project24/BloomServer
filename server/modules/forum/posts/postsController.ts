import { ForumPost, PrismaClient } from "@prisma/client";
import { Appointmenent } from "../../../types";
import { Request, Response } from "express";

const prisma=new PrismaClient();

///////////////////////////get all forums posts/////////////////////////////////////
const getAllF = async (req:Request,res:Response)=> {
try {
    const forumPosts = await prisma.forumPost.findMany({})
    res.send(forumPosts)
}
catch (error){
    res.send(error)
}
}

///////////////////////////////add forum post with one flair//////////////////////////////////////
const addF = async (req:Request,res:Response)=> {
    try {
        //create post
        const forumPost:ForumPost = await prisma.forumPost.create({data:req.body})
        //add flair to post
        const updateForum = await prisma.forumPost.update({
            where: {
              id: forumPost.id,
            },
            data: {
              flairs: {
                connect: {
                    name:req.params.flair
                }
              },
            },
          })
        res.send(updateForum)
    }
    catch (error){
        res.send(error)
    }
    }

////////////////////////////update post to add flairs///////////////////////////////:
   const  addFlairToPost = async (req:Request,res:Response)=> {
    try {
        const updateForum = await prisma.forumPost.update({
            where: {
                id: Number(req.params.postId),
            },
            data: {
              flairs: {
                connect: {
                    id:Number(req.params.flairId)
                }
              },
            },
          })
        res.send(updateForum)
    }
    catch (error){
        res.send(error)
    }
    }


//////////////////////////////upvote post /////////////////////////////////////
const upvotePost = async (req:Request,res:Response)=> {
    try {
        const updateForum = await prisma.forumPost.update({
            where: {
              id: Number(req.body.postId),
            },
            data: {
              upvote: {
                increment: 1
              },
            },
          })
        res.send(updateForum)
    }
    catch (error){
        res.send(error)
    }
    }

//////////////////////////////downvote post /////////////////////////////////////
    const downvotePost = async (req:Request,res:Response)=> {
        try {
            const updateForum = await prisma.forumPost.update({
                where: {
                  id: Number(req.body.postId),
                },
                data: {
                  downvote: {
                    increment: 1
                  },
                },
              })
            res.send(updateForum)
        }
        catch (error){
            res.send(error)
        }
        }



export {getAllF,addF,addFlairToPost,upvotePost,downvotePost}