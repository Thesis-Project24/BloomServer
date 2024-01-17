import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();


/////////////////////////////////////create article/////////////////////////////////
export const createArticle = async (req: Request, res: Response) => {

  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  const { content, authorId,title} = req.body;

  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId,
        createdAt: formattedDate,
      },
    });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


/////////////////////////////////get all articles/////////////////////////////////////
export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const article = await prisma.article.findMany({
        include : {
            author: {
                select: {
                  first_name: true,
                  last_name: true,
                  specialty:true,
                  profile_picture:true,
                }
              }       
        }
    });

    return res.status(200).json({ article });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error :(" });
  }
};

///////////////////////////////////get one article//////////////////////////////////////
export const getArticleById = async (req:Request, res:Response) => {
  const { id } = req.body;
  try {
   const article = await prisma.article.findUnique({
     where: {
       id: Number(id),
     },
     include: {
       author: {
         select: {
           first_name: true,
           last_name: true,
           specialty: true,
           profile_picture: true,
         },
       },
     },
   });
   if (!article) {
     return res.status(404).json({ error: "Article not found" });
   }
   return res.status(200).json({ article });
  } catch (error) {
   console.error(error);
   return res.status(500).json({ error: "Internal Server Error :(" });
  }
 };
 
///////////////////////////////delete an article/////////////////////////////////:
export const deleteArticle = async (req:Request, res:Response)=> {
  try {
    await prisma.article.delete({where:{id:Number(req.params.id)}})
    res.send("deleted")
  }
  catch(error){
    res.send(error)
  }
}
///////////////////////// add article to saved list of one user//////////////////////////
export const saveArticle = async (req: Request, res: Response) => {
  const { userId, articleId } = req.body;

  try {
    const saveArticle = await prisma.saveArticle.create({
      data: {
        userId,
        articleId,
      },
    });
    res.status(201).json(saveArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error :( " });
  }
};

////////////////////////////////////get all saved articles of one user////////////////////////:
export const getSavedArticle = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const savedArticle = await prisma.saveArticle.findMany({
      where: {
        userId: userId,
      },
      include: {
        article: true,
      },
    });
    res.status(200).json(savedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error :( " });
  }
};


///////////////////////////////////search articles///////////////////////////////////
export const searchArticles = async (req: Request, res: Response) => {
  const { keyword } = req.body;
  try {
    if (!keyword || typeof keyword !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing keyword parameter" });
    }
    const articles = await prisma.article.findMany({
      where: {
        content: {
          contains: keyword,
          mode: "insensitive",
        },
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error :(" });
  }
};
