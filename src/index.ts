require('dotenv/config');
import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
  } catch (error) {
    console.error(error);
  }
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!!!`);
  });
};

start();
