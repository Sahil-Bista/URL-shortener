import express from 'express';
import { URLRouter } from './URL.js';

export const router = express.Router();

router.use('/url', URLRouter);
