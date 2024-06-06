import mongoose, {Schema, model, connect} from "mongoose";
import { MongoClient } from "mongodb";
import { seed } from "./seed";
import { IPost } from "../../types/db.interface";
require("dotenv").config();



const postSchema = new Schema<IPost>({
  content: {type: String, required: true},
  title: {type: String, maxlength: 300, required: true},
  author: {type: String, required: true}
});

const Post = model<IPost>("Post", postSchema);

export const client = new MongoClient(process.env.MONGO_URI!)
export const db = client.db("node-ts-api")

const connectDB = async (): Promise<Object> => {
  try {
    await connect(process.env.MONGO_URI!)
    console.log('Connected to database!');

    return {status: 200, message: "Connected to database!"}
  } catch (error) {
    return {status: 400, message: "Failed to connect to database!"};
  }
}

export default connectDB;