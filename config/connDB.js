import mongoose from 'mongoose';
import { logger } from '../logger/index.js';

export const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongo database');
    logger.info('Connected to Mongo Database');
  } catch (err) {
    logger.error('Error while connection to the database');
    throw Error;
  }
};
