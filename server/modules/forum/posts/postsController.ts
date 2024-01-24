import { ForumPost, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

///////////////////////////get all forums posts/////////////////////////////////////
// const getAllF = async (req:Request,res:Response)=> {
// try {
//     const forumPosts = await prisma.forumPost.findMany({

//         include: {
//           author: {
//             select : {
//               username:true,
//               profile_picture:true,
//             }
//           }
//         }
//     })
//     res.send(forumPosts)
// }
// catch (error){
//     res.send(error)
// }
// }
const getAllF = async (req: Request, res: Response) => {
    try {
        const forumPosts = await prisma.forumPost.findMany({
            include: {
                author: {
                    select: {
                        fullName: true,
                        profile_picture: true,
                    },
                },
            },
        });
        res.send(forumPosts);
    } catch (error) {
        res.send(error);
    }
};

/////////////////////////////////////get one post///////////////////////////////////////
const getOneF = async (req: Request, res: Response) => {
    try {
        const forumPost = await prisma.forumPost.findUnique({
            where:{
                id:Number(req.params.id)
            },
            include: {
                author: {
                    select: {
                        fullName: true,
                        profile_picture: true,
                    },
                },
                comments:true
            },
        });
        res.send(forumPost);
    } catch (error) {
        res.send(error);
    }
};

///////////////////////////////add forum post with one flair//////////////////////////////////////
const addF = async (req: Request, res: Response) => {
    try {
        //create post
        const forumPost: ForumPost = await prisma.forumPost.create({
            data: req.body,
        });
        //add flair to post
        const updateForum = await prisma.forumPost.update({
            where: {
                id: forumPost.id,
            },
            data: {
                flairs: {
                    connect: {
                        name: req.params.flair,
                    },
                },
            },
        });
        res.send(updateForum);
    } catch (error) {
        res.send(error);
    }
};

////////////////////////////update post to add flairs///////////////////////////////:
const addFlairToPost = async (req: Request, res: Response) => {
    try {
        const updateForum = await prisma.forumPost.update({
            where: {
                id: Number(req.params.postId),
            },
            data: {
                flairs: {
                    connect: {
                        id: Number(req.params.flairId),
                    },
                },
            },
        });
        res.send(updateForum);
    } catch (error) {
        res.send(error);
    }
};

//////////////////////////////////:delete post////////////////////////////////////:
const deletePost = async (req: Request, res: Response) => {
    try {
        await prisma.forumPost.delete({ where
            : { id: Number(req.params.id) } })
        res.send("deleted");
    } catch (error:any) {
        res.send(error.message);
    }
};
//////////////////////////////upvote post /////////////////////////////////////
const upvotePost = async (req: Request, res: Response) => {
    try {
        const updateForum = await prisma.forumPost.update({
            where: {
                id: Number(req.body.postId),
            },
            data: {
                upvote: {
                    increment: 1,
                },
            },
        });
        res.send(updateForum);
    } catch (error) {
        res.send(error);
    }
};

//////////////////////////////downvote post /////////////////////////////////////
const downvotePost = async (req: Request, res: Response) => {
    try {
        const updateForum = await prisma.forumPost.update({
            where: {
                id: Number(req.body.postId),
            },
            data: {
                downvote: {
                    increment: 1,
                },
            },
        });
        res.send(updateForum);
    } catch (error) {
        res.send(error);
    }
};

        const addForum = async(req:Request,res:Response)=>{
const {content,authorId,title}=req.body
try {
  const post = await prisma.forumPost.create({
    data: {
      content,
      authorId,
      title
    }
  })
  res.status(200).send(post)
} catch (error) {
  console.error(error)
  res.status(500).json({error: 'error creating forum'})
}
}
const searchUsers = async (req:Request, res:Response) => {
    
    const searchQuery = req.query.q === '' ? '' : String(req.query.q);
    console.log("Search Query:", searchQuery);

    try {
        const users = await prisma.user.findMany({
            where: {
                username: { 
                    contains: searchQuery, 
                    mode: 'insensitive' 
                }
            },
            select: {
                id: true,
                username: true,
                fullName: true
            }
        });

        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
};

export { getAllF, addF, addFlairToPost, upvotePost, downvotePost, deletePost,getOneF,searchUsers };
