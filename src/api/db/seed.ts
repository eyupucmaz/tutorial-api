import { IPost } from "../../types/db.interface";
import { db } from "./index";

const createSeed = (): IPost[] =>{
  const posts: IPost[] = [];
  for(let i = 0; i < 50; i++){
    posts.push({
      content: `This is a post ${i}. content`,
      title: `Post Title-${i}`,
      author: `Author-${i}`,
    });
  }
  return posts;
}

export const seed = async (): Promise<Object> => {
  try {
    const posts = createSeed();
    await db.collection("posts").insertMany(posts);
    console.log("Database Seeded! 🌱")

    return {seedMsg: posts}
  } catch (error) {

    return {error: error}
  }
}

seed()