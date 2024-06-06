/**
 * This is the main entry point of the API server.
 * It sets up the server, connects to the database, and defines the routes.
 */

import connectDB, { db } from './api/db';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { ObjectId } from 'mongodb';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

connectDB();

/**
 * GET /
 * A simple test route to check if the server is running.
 * @param req - The request object.
 * @param res - The response object.
 */
app.get('/', (req: Request, res: Response): void => {
  try {
    res.json({
      message: 'It works!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
    });
  }
});

/**
 * GET /item/all
 * Get all items from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing an array of items.
 */
app.get('/item/all', async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await db.collection('posts').find().toArray();
    res.json({ docs: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      error: error,
    });
  }
});

/**
 * GET /item/:id
 * Get an item by its ID from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the item.
 */
app.get('/item/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
