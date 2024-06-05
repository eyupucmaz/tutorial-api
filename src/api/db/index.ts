import mongoose, {Schema, model, connect} from "mongoose";
import { MongoClient } from "mongodb";
require("dotenv").config();

interface IPost {
  content: string;
  title: string;
  author: string;
}

const postSchema = new Schema<IPost>({
  content: {type: String, required: true},
  title: {type: String, maxlength: 300, required: true},
  author: {type: String, required: true}
});

const Post = model<IPost>("Post", postSchema);

export const client = new MongoClient(process.env.MONGO_URI!)